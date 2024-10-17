import mongoose, { Document, Schema } from 'mongoose';
import { USER_TYPES } from '../collections.name';

export interface UserTypesSchema extends Document {
    name: string;
    type: number;
    is_deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userTypesSchema: Schema<UserTypesSchema> = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field
userTypesSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const UserTypesModal = mongoose.model(USER_TYPES, userTypesSchema);
