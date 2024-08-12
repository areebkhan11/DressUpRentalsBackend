// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async create(createProductDto: CreateProductDto, user: any): Promise<Product> {
        const { categoryId, ...productData } = createProductDto;

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        const product = this.productRepository.create({ ...productData, category, user });
        return this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['category'] });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const { categoryId, ...productData } = updateProductDto;

        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        if (categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) {
                throw new NotFoundException(`Category with ID ${categoryId} not found`);
            }
            product.category = category;
        }

        await this.productRepository.update(id, productData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
