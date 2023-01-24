import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { UserRoles } from '@nx-monorepo/backend/core';
import { Request } from 'express';
import { User } from '../../../datasources/mongodb/user/schemas/user.schema';

export const RoleGuard = (role: UserRoles): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const user = context.switchToHttp().getRequest<Request>().user as Omit<User, 'password'>;
            return user?.roles.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
};
