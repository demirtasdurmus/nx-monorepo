import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from '../../../../utils/uuid';
import { HydratedDocument } from 'mongoose';
import { UserStatus, UserRoles, IUser } from '@nx-monorepo/backend/core';

export type UserDocument = HydratedDocument<User>;

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
export class User implements IUser {
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

    @Prop({ default: 'active', enum: ['active', 'passive', 'suspended', 'banned'], type: 'String' })
    status: UserStatus;

    @Prop({ default: [UserRoles.USER], type: ['String'] })
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
