import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { DOCTOR_SPECIALTIES, SPECIALITY, USERS } from '../collections.name';

export interface DoctorSpecialitySchema extends Document {
    doctor_id: ObjectId;
    speciality_ids: ObjectId[];
    is_deleted: boolean;
}

const doctorSpecialitySchema: Schema<DoctorSpecialitySchema> = new Schema(
    {
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USERS,
            required: true,
        },
        speciality_ids: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: SPECIALITY,
            required: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const UsersModal = model<DoctorSpecialitySchema>(DOCTOR_SPECIALTIES, doctorSpecialitySchema);
