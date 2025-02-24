import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Ordinateur portable',
    description: 'Nom du produit',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Un puissant ordinateur portable.',
    description: 'Description du produit',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1200.99, description: 'Prix du produit' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 10, description: 'Quantité en stock' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 10, description: 'Quantité en stock' })
  @IsNumber()
  @Min(0)
  articlePrice: number;

  @ApiProperty({ example: 10, description: 'Quantité en stock' })
  @IsNumber()
  @Min(0)
  profit: number;

  @ApiProperty({ example: 10, description: 'Quantité en stock' })
  @IsNumber()
  @Min(0)
  profitMargin: number;

  @ApiProperty({
    example: 'Informatique',
    description: 'Nom de la catégorie du produit',
  })
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @ApiProperty({
    example: 'a7b1c9d2-e3f4-5678-90ab-cdef12345678',
    description: 'ID de la boutique',
  })
  @IsUUID()
  storeId?: string;

  @ApiProperty({
    example: ['data:image/png;base64,...', 'data:image/png;base64,...'],
    description: 'Images du produit',
    required: false,
  })
  @IsArray()
  @IsOptional()
  images?: string[];

  variants?: { name: string; variantValue: string }[];

  status?: ProductStatus;
}

export class ResponseProductDto {
  id?: any;
  product?: {
    name: string;
    images: string[];
    variants?: { name: string; variantValue: string }[];
  };
  categoryName?: string;
  stock?: number;
  price?: number;
  description?: string;
  articlePrice: number;
  profit: number;
  profitMargin: number;
  status?: ProductStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
