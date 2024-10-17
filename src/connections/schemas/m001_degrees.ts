import mongoose, { Document, Schema } from 'mongoose';
import { DEGREES } from '../collections.name';

export interface DegreesSchema extends Document {
    degree_name: string;
    is_deleted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const degreesSchema: Schema<DegreesSchema> = new Schema({
    degree_name: {
        type: String,
        unique: true,
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
});

// Middleware to update the updatedAt field
degreesSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const DegreesModal = mongoose.model(DEGREES, degreesSchema);
