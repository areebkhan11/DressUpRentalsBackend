// src/categories/category.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the category' })
    id: number;

    @Column()
    @ApiProperty({ description: 'Name of the category' })
    name: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Image URL of the category', required: false })
    image: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
