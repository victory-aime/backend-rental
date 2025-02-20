import { ApiProperty } from '@nestjs/swagger';
import {
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
}
