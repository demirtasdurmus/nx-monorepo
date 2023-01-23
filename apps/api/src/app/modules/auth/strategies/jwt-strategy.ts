import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

type DecodedJWT = {
    data: { email: string };
    iat: number;
    exp: number;
    iss: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
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

    async validate(payload: DecodedJWT) {
        return payload.data;
    }
}
