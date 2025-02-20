import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '_config/services';
import { CreateProductDto } from './products.dto';
import * as categories from '../category/categories.json';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    // Vérifier si la catégorie existe dans le fichier JSON
    const categoryExists = categories?.some(
      (cat) => cat.name === dto.categoryName,
    );
    if (!categoryExists) {
      throw new BadRequestException(
        `La catégorie "${dto.categoryName}" n'existe pas.`,
      );
    }

    // Vérifier si la boutique existe
    const store = await this.prisma.store.findUnique({
      where: { id: dto.storeId },
    });
    if (!store) {
      throw new NotFoundException('La boutique spécifiée est introuvable.');
    }

    // Création du produit
    return await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        categoryName: dto.categoryName,
        storeId: dto.storeId,
      },
    });
  }

  async getProducts(storeId: any): Promise<{ message: string; content: any }> {
    const products = await this.prisma.product.findMany({
      where: { storeId },
      include: {
        images: true,
      },
    });
    console.log('products', products);
    return {
      message: 'Liste retourne avec success',
      content: products,
    };
  }
}
