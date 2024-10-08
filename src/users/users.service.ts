import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(registerDto: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = this.usersRepository.create({
            ...registerDto,
            password: hashedPassword,
            provider: 'local',
        });
        return this.usersRepository.save(newUser);
    }

    async createOAuthUser(user: any): Promise<User> {
        const newUser = this.usersRepository.create({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            provider: user.provider,
            role: 'user',
        });
        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async update(id: number, updateUserDto: RegisterDto): Promise<User> {
        const user = await this.findOneById(id);
        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;
        user.email = updateUserDto.email;
        user.picture = updateUserDto.picture;
        user.password = await bcrypt.hash(updateUserDto.password, 10);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOneById(id);
        await this.usersRepository.remove(user);
    }
}
