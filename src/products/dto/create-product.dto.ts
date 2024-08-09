// src/products/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'barat suit', description: 'Title of the product' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'this is a great dress', description: 'Description of the product' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: ['232334'], description: 'Images of the product', type: [String] })
    @IsArray()
    @IsNotEmpty()
    images: string[];

    @ApiProperty({ example: 'used', description: 'New/Used condition of the product' })
    @IsString()
    @IsNotEmpty()
    condition: string;

    @ApiProperty({ example: 'female', description: 'Gender of the product (men, women, unisex)' })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty({ example: 200, description: 'Price of the product' })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ example: 'sen sevesten garden', description: 'Address of the product' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: '1', description: 'ID of the category the product belongs to' })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}
