// src/products/dto/update-product.dto.ts
import { IsString, IsDecimal, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDecimal()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;  // Add this line

}
