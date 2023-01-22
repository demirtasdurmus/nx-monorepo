import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserUsecaseProvidersModule } from '../../di/user-usecase-providers.module';
import { BcryptModule } from '@nx-monorepo/nest';

@Module({
    imports: [UserUsecaseProvidersModule.forRoot(), BcryptModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
