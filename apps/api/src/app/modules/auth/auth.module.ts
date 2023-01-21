import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local-strategy';
import { JwtStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthUsecaseProvidersModule } from '../../di/auth-usecase-providers.module';
import { UserService } from '../user/user.service';

@Module({
    imports: [
        AuthUsecaseProvidersModule.forRoot(),
        PassportModule,
        UserModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [LocalStrategy, JwtStrategy, AuthService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
