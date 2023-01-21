import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@nx-monorepo/backend/core';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.userService.getByEmail(email);
        if (user && user.password === password) {
            const { password, ...result } = user;
            console.log('pass', password);
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
