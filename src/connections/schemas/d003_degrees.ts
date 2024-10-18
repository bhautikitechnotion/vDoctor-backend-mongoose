import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { DEGREES, DOCTOR_DEGREES, USERS } from '../collections.name';

export interface DoctorsDegreeSchema extends Document {
    doctor_id: ObjectId;
    degree_ids: ObjectId[];
    is_deleted: boolean;
}

const doctorsDegreeSchema: Schema<DoctorsDegreeSchema> = new Schema(
    {
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USERS,
            required: true,
        },
        degree_ids: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: DEGREES,
            required: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const UsersModal = model<DoctorsDegreeSchema>(DOCTOR_DEGREES, doctorsDegreeSchema);
