// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the user' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The email of the user' })
    email: string;

    @Column()
    @ApiProperty({ description: 'The hashed password of the user' })
    password: string;

    @Column()
    @ApiProperty({ description: 'The first name of the user' })
    firstName: string;

    @Column()
    @ApiProperty({ description: 'The last name of the user' })
    lastName: string;

    @Column()
    @ApiProperty({ description: 'The authentication provider of the user' })
    provider: string;
}
