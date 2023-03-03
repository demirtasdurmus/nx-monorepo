export type UserStatus = 'active' | 'passive' | 'suspended' | 'banned';

export enum UserRoles {
    USER = 'USER',
    DEVELOPER = 'DEVELOPER',
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPER_ADMIN',
}

export interface IUser {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    profileImage?: string;
    isVerified?: boolean;
    status?: UserStatus;
    roles?: UserRoles[];
    privacyPolicyAccepted?: boolean;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}

export type CreateUserAttrs = Required<Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>>;

export type UpdateUserAttrs = Pick<IUser, 'id' | 'firstName' | 'lastName' | 'profileImage'>;
