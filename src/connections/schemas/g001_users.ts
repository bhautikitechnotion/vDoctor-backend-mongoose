import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { USERS, USER_TYPES } from '../collections.name';

export interface UsersSchema extends Document {
    email: string;
    password: string;
    type: ObjectId;
    is_deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    first_login: boolean;
    step: number;
    access_token: string;
    refresh_token: string;
    reset_password_token: string;
}

const usersSchema: Schema<UsersSchema> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_TYPES,
        required: true,
    },
    is_deleted: {
        type: Boolean,
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
    first_login: {
        type: Boolean,
        default: true,
    },
    step: {
        type: Number,
        default: -1,
    },
    access_token: {
        type: String,
        default: null,
    },
    refresh_token: {
        type: String,
        default: null,
    },
    reset_password_token: {
        type: String,
        default: null,
    },
});

// Middleware to update the updatedAt field
usersSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const UsersModal = mongoose.model(USERS, usersSchema);
