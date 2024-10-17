import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { DEGREES, DOCTOR_SPECIALTIES } from '../collections.name';

export interface DoctorSpecialitySchema extends Document {
    doctor_id: ObjectId;
    degree_ids: ObjectId[];
    is_deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const doctorSpecialitySchema: Schema<DoctorSpecialitySchema> = new Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DOCTOR_SPECIALTIES,
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
doctorSpecialitySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const UsersModal = mongoose.model(DOCTOR_SPECIALTIES, doctorSpecialitySchema);
