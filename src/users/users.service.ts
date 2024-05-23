import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(user: Partial<User>): User {
        const newUser = { ...user } as User;
        this.users.push(newUser);
        return newUser;
    }

    findOne(email: string): User {
        return this.users.find(user => user.email === email);
    }
}
