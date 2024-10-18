import { Document, Schema, model } from 'mongoose';
import { USER_TYPES } from '../collections.name';

export interface UserTypesSchema extends Document {
    name: string;
    type: number;
    is_deleted: boolean;
}

const userTypesSchema: Schema<UserTypesSchema> = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        is_deleted: {
            type: Boolean,
            unique: true,
            default: false,
        },
    },
    { timestamps: true },
);

export const UserTypesModal = model<UserTypesSchema>(USER_TYPES, userTypesSchema);
