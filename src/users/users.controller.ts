// src/users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards//jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    async create(@Body() registerDto: RegisterDto): Promise<User> {
        return this.usersService.create(registerDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: RegisterDto): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.usersService.remove(id);
    }
}
