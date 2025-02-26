import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '_config/services';
import { CreateProductDto, ResponseProductDto } from './products.dto';
import * as categories from '../category/categories.json';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    const categoryExists = categories?.some(
      (cat) => cat.name === dto.categoryName,
    );
    if (!categoryExists) {
      throw new BadRequestException(
        `La catégorie "${dto.categoryName}" n'existe pas.`,
      );
    }
    const store = await this.prisma.store.findUnique({
      where: { id: dto.storeId },
    });
    if (!store) {
      throw new NotFoundException('La boutique spécifiée est introuvable.');
    }
    return await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        categoryName: dto.categoryName,
        status: dto.status,
        storeId: dto.storeId,
        images: dto.images || [],
        articlePrice: dto.articlePrice,
        profit: dto.profit,
        profitMargin: dto.profitMargin,
        variants: {
          createMany: {
            data: dto.variants?.map((variant) => ({
              name: variant?.name,
              variantValue: variant?.variantValue,
            })),
          },
        },
      },
    });
  }

  async getProducts(
    storeId: string,
  ): Promise<{ content: ResponseProductDto[] }> {
    try {
      const products = await this.prisma.product.findMany({
        where: { storeId, deletedAt: null },
        include: {
          variants: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      const transformProductData: ResponseProductDto[] = products?.map(
        (item) => ({
          id: item?.id,
          product: {
            name: item?.name,
            images: item?.images,
            variants: item?.variants?.map((variant) => ({
              name: variant.name,
              variantValue: variant?.variantValue,
            })),
          },
          description: item?.description,
          price: item?.price,
          articlePrice: item?.articlePrice,
          profit: item?.profit,
          profitMargin: item?.profitMargin,
          stock: item?.stock,
          categoryName: item?.categoryName,
          status: item?.status,
          createdAt: item?.createdAt,
        }),
      );
      return {
        content: transformProductData,
      };
    } catch (error) {
      throw new BadRequestException('Impossible de retourner la liste');
    }
  }

  async updateProduct(updateDto: any): Promise<{ message: string }> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: updateDto.id, storeId: updateDto.storeId },
        include: {
          variants: true,
        },
      });
      if (!product) {
        throw new BadRequestException('impossible de faire la mise a jour');
      }
      await this.prisma.product.update({
        where: { id: updateDto.id, storeId: updateDto.storeId },
        data: {
          ...updateDto,
          variants: {
            deleteMany: {},
            createMany: {
              data: updateDto.variants?.map(
                (variant: { name: string; variantValue: string }) => ({
                  name: variant?.name,
                  variantValue: variant?.variantValue,
                }),
              ),
            },
          },
        },
      });
      return {
        message: 'Produit mis a jour',
      };
    } catch (error) {
      throw new BadRequestException('Erreur veuillez ressayer plus tard');
    }
  }

  async softdeleteProduct(productId: string) {
    try {
      if (!productId) {
        throw new BadRequestException('Informations manquantes');
      }
      return await this.prisma.product.update({
        where: { id: productId },
        data: { deletedAt: new Date() }, // Marque comme supprimé
      });
    } catch (error) {
      throw new BadRequestException('Veuillez reessayer plus tard', error);
    }
  }

  async getTrashProducts(
    storeId: string,
  ): Promise<{ content: ResponseProductDto[] }> {
    const products = await this.prisma.product.findMany({
      where: { storeId, deletedAt: { not: null } },
      include: {
        variants: true,
      },
      orderBy: { deletedAt: 'desc' },
    });
    const transformProductData: ResponseProductDto[] = products?.map(
      (item) => ({
        id: item?.id,
        product: {
          name: item?.name,
          images: item?.images,
          variants: item?.variants?.map((variant) => ({
            name: variant.name,
            variantValue: variant?.variantValue,
          })),
        },
        price: item?.price,
        stock: item?.stock,
        categoryName: item?.categoryName,
        status: item?.status,
        deletedAt: item?.deletedAt,
      }),
    );
    return {
      content: transformProductData,
    };
  }

  async restoreProduct(id: string) {
    return await this.prisma.product.update({
      where: { id },
      data: { deletedAt: null }, // Remet à zéro la suppression
    });
  }

  async deletePermanently(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return {
        message: 'Produit supprimer',
      };
    } catch (error) {
      throw new BadRequestException('Veuillez resseayer plus tard');
    }
  }
}
