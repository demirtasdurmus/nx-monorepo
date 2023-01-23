import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@nx-monorepo/backend/core';
import { BcryptService } from '@nx-monorepo/nest';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly bcryptService: BcryptService,
    ) {}

    async createAccessToken(user: User): Promise<string> {
        const token = await this.jwtService.signAsync({
            data: { id: user.id },
        });
        this.logger.log(`The user logged in with ${user.email}`);
        return token;
    }

    async validateUser(email: string, password: string): Promise<Pick<User, 'id'>> {
        const user = await this.userService.getByEmail(email);
        if (!user) {
            this.logger.error(`The user could not be validated with ${email}`);
            throw new BadRequestException('Incorrect email or password');
        }
        const isPasswordCorrect = await this.checkPassword(password, user.password);
        if (!isPasswordCorrect) {
            this.logger.error(`The user could not be validated with ${email}`);
            throw new BadRequestException('Incorrect email or password');
        }
        this.logger.log(`The user validated with ${email}`);
        return { id: user.id };
    }

    private async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await this.bcryptService.compare(password, hashedPassword);
    }
}
