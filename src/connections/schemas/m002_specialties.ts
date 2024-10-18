import { Document, Schema, model } from 'mongoose';
import { SPECIALITY } from '../collections.name';

export interface SpecialitiesSchema extends Document {
    speciality_name: string;
    icon: string;
    is_deleted: boolean;
}

const specialitiesSchema: Schema<SpecialitiesSchema> = new Schema(
    {
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
    },
    { timestamps: true },
);

export const SpecialityModal = model<SpecialitiesSchema>(SPECIALITY, specialitiesSchema);
