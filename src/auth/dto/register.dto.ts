// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user', minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user', required: false })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty({ example: 'profile.jpg', description: 'Picture name of the user', required: false })
    @IsString()
    @IsOptional()
    picture?: string;

    @ApiProperty({ example: '1234567890', description: 'The phone number of the user' })
    @IsNumber()
    phoneNumber: number;

    @ApiProperty({ example: '1234567890', description: 'The WhatsApp number of the user', required: false })
    @IsNumber()
    @IsOptional()
    whatsAppNumber?: number;

    @ApiProperty({ example: 'local', description: 'The authentication provider of the user' })
    @IsString()
    provider: string;

    @ApiProperty({ example: 'user', description: 'The role of the user', default: 'user', required: false })
    @IsString()
    @IsOptional()
    role?: string;
}
