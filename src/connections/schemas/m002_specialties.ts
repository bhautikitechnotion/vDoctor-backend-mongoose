import mongoose, { Document, Schema } from 'mongoose';
import { SPECIALITY } from '../collections.name';

export interface SpecialitiesSchema extends Document {
    speciality_name: string;
    icon: string;
    is_deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const specialitiesSchema: Schema<SpecialitiesSchema> = new Schema({
    speciality_name: {
        type: String,
        unique: true,
        required: true,
    },
    icon: {
        type: String,
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
specialitiesSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const SpecialityModal = mongoose.model(SPECIALITY, specialitiesSchema);
