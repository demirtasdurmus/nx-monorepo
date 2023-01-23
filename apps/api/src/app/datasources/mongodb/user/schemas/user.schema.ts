import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from '../../../../utils/uuid';
import { HydratedDocument } from 'mongoose';
// import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserStatus = 'active' | 'passive' | 'suspended' | 'banned';
export enum UserRoles {
    USER = 'USER',
    DEVELOPER = 'DEVELOPER',
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPER_ADMIN',
}

@Schema({
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
    },
    toObject: {
        virtuals: true,
        transform: (_doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
    },
})
export class User {
    @Prop({ default: UUID.generateId() })
    _id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    profileImage: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ default: 'active', enum: ['active', 'passive', 'suspended', 'banned'] })
    status: UserStatus;

    @Prop({ default: [UserRoles.USER] })
    roles: UserRoles[];

    @Prop()
    privacyPolicyAccepted: boolean;

    @Prop()
    passwordChangedAt: Date;

    @Prop()
    passwordResetToken: string;

    @Prop()
    passwordResetExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
