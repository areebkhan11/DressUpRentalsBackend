import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/product.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the user' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The email of the user' })
    email: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The hashed password of the user' })
    password?: string;

    @Column()
    @ApiProperty({ description: 'The first name of the user' })
    firstName: string;

    @Column()
    @ApiProperty({ description: 'The last name of the user' })
    lastName?: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The profile picture of the user' })
    picture?: string;

    @Column()
    @ApiProperty({ description: 'The phone number of the user' })
    phoneNumber: number;

    @Column()
    @ApiProperty({ description: 'The whatsapp number of the user' })
    whatsAppNumber?: number;

    @Column()
    @ApiProperty({ description: 'The authentication provider of the user' })
    provider: string;

    @Column({ default: 'user' }) // Adding role column with default value 'user'
    role?: string;


    @OneToMany(() => Product, product => product.user)
    products: Product[];
}
