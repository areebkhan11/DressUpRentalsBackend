// src/products/dto/update-product.dto.ts
import { IsString, IsDecimal, IsOptional } from 'class-validator';

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
}
