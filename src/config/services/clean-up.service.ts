import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.db.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProductCleanupService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Exécuté tous les jours à minuit
  async deleteOldProducts() {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 30); // 30 jours avant aujourd'hui
    const deleted = await this.prisma.product.deleteMany({
      where: { deletedAt: { lte: dateThreshold } }, // Supprime si `deletedAt` a plus de 30 jours
    });

    console.log(`🗑️ Produits définitivement supprimés : ${deleted.count}`);
  }
}
