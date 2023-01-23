import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { User } from '@nx-monorepo/backend/core';

type DecodedJWT = {
    data: { id: string };
    iat: number;
    exp: number;
    iss: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }

    private static extractJWT(req: Request): string | null {
        if (req.cookies && req.cookies.jwt) {
            return req.cookies.jwt;
        }
        return null;
    }

    async validate(payload: DecodedJWT): Promise<Omit<User, 'password'>> {
        const user = await this.userService.getById(payload.data.id);
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
        };
    }
}
