// src/products/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsDecimal } from 'class-validator';

export class UpdateProductDto {
    @ApiProperty({ description: 'Title of the product' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Description of the product' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Images of the product', type: [String] })
    @IsArray()
    @IsNotEmpty()
    images: string[];

    @ApiProperty({ description: 'New/Used condition of the product' })
    @IsString()
    @IsNotEmpty()
    condition: string;

    @ApiProperty({ description: 'Gender of the product (men, women, unisex)' })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty({ description: 'Price of the product' })
    @IsDecimal()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ description: 'Address of the product' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ description: 'ID of the category the product belongs to' })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}
