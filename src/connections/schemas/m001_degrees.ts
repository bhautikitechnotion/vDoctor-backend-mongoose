import mongoose, { Document, Schema } from 'mongoose';
import { DEGREES } from '../collections.name';

export interface DegreesSchema extends Document {
    degree_name: string;
    is_deleted: boolean;
}

const degreesSchema: Schema<DegreesSchema> = new Schema(
    {
        degree_name: {
            type: String,
            unique: true,
            required: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const DegreesModal = mongoose.model(DEGREES, degreesSchema);
