// src/categories/dto/create-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Name of the category' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Image URL of the category', required: false })
    @IsString()
    @IsOptional()
    image?: string;
}
