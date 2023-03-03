import { IUser } from '@nx-monorepo/backend/core';

export interface JwtPayload {
    data: Pick<IUser, 'email'>;
    iat: number;
    exp: number;
    iss: string;
}
