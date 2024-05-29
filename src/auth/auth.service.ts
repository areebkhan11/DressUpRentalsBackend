import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async googleLogin(req) {
        if (!req.user) {
            return 'No user from Google';
        }

        const user = await this.usersService.findOne(req.user.email);
        if (!user) {
            this.usersService.create(req.user);
        }

        return this.createTokens(req.user.email);
    }

    async register(registerDto: RegisterDto) {
        // Check if user already exists
        const existingUser = await this.usersService.findOne(registerDto.email);
        if (existingUser) {
            throw new UnauthorizedException('User already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);
        console.log(hashedPassword, "<----hashedPassword");

        // Create a new user with the hashed password
        const newUser = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });

        // Verify that the user has been created and saved correctly
        const savedUser = await this.usersService.findOne(newUser.email);
        console.log(savedUser, "<----savedUser after creation");

        // Return tokens
        return this.createTokens(newUser.email);
    }

    async login(loginDto: LoginDto) {
        // Find the user by email
        const user = await this.usersService.findOne(loginDto.email);
        console.log(user, "<----user found in login");

        // Verify user exists and password matches
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        console.log(isPasswordValid, "<----isPasswordValid");

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Return tokens
        return this.createTokens(user.email);
    }

    async createTokens(email: string) {
        const payload = { email };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        return {
            email: payload.email,
            accessToken,
            refreshToken,
            expiresIn: 3600, // 1 hour in seconds
        };
    }

    async refresh(refreshTokenDto: RefreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.usersService.findOne(payload.email);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return this.createTokens(user.email);
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
