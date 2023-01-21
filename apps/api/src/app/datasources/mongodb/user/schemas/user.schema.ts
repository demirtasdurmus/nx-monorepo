import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { User } from '../../user/schemas/user.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret._id;
        },
    },
    toObject: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret._id;
        },
    },
})
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    // referencing in action with decorators
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    // owner: User;

    // In case there are multiple owners, your property configuration should look as follows:
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    // owner: User[];

    // the raw schema definition can also be passed to the decorator
    // @Prop(
    //     raw({
    //         firstName: { type: String },
    //         lastName: { type: String },
    //     }),
    // )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // details: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
