// src/products/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    price: number;

    @Column()
    imageUrl: string;

    @ManyToOne(() => User, user => user.products)
    user: User;
}
