import { User } from '@nx-monorepo/backend/core';

export interface JwtPayload {
    data: Pick<User, 'email'>;
    iat: number;
    exp: number;
    iss: string;
}
