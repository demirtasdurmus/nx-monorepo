import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserUsecaseProvidersModule } from '../../di/user-usecase-providers.module';

@Module({
    imports: [UserUsecaseProvidersModule.forRoot()],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
