// src/products/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the user' })
    id: number;

    @Column()
    @ApiProperty({ description: 'Title of the product' })
    title: string;

    @Column('text')
    @ApiProperty({ description: 'Description of the product' })
    description: string;

    @Column("text", { array: true })
    @ApiProperty({ description: 'Images of the product' })
    images: string[];

    @Column()
    @ApiProperty({ description: 'New/Used condition of the product' })
    condition: string;

    @Column()
    @ApiProperty({ description: 'men, women, unisex gender of the product' })
    gender: string;

    @Column()
    @ApiProperty({ description: 'price of the product' })
    price: number;

    @Column()
    @ApiProperty({ description: 'address of the product' })
    address: string;


    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToOne(() => User, user => user.products)
    user: User;
}
