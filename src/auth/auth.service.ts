import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }


    async handleGoogleCallback(accessToken: string) {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
            );
            const profile = response.data;
            console.log(profile, "<----response")
            let user = await this.usersService.findOne(profile.email);
            if (!user) {
                console.log("Asdasd")
                user = await this.usersService.createOAuthUser({
                    email: profile.email,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    picture: profile.picture,
                    provider: 'google'
                });
            }

            console.log(user, "<----user")
            return this.createTokens(user.email);
        } catch (error) {
            console.log(error, "<----")
            throw new UnauthorizedException('Invalid Google token');
        }
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findOne(registerDto.email);
        if (existingUser) {
            throw new UnauthorizedException('User already registered');
        }
        const newUser = await this.usersService.create(registerDto);
        return this.createTokens(newUser.email);
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findOne(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
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
