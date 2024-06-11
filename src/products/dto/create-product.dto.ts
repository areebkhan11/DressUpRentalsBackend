// src/products/dto/create-product.dto.ts
import { IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsDecimal()
    price: number;
}
