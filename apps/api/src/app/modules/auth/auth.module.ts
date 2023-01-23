import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BcryptModule } from '@nx-monorepo/nest';

@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '10d', issuer: 'nx-monorepo' },
        }),
        BcryptModule,
    ],
    providers: [LocalStrategy, JwtStrategy, AuthService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
