import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { CLINIC_INFO, USERS } from '../collections.name';

export interface DClinicInfoSchema extends Document {
    doctor_id: ObjectId;
    address: string;
    address_url: string;
    city: string;
    country: string;
    state: string;
    zipCode: number;
    is_deleted: boolean;
}

const dClinicInfoSchema: Schema<DClinicInfoSchema> = new Schema(
    {
        doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: USERS, required: true },
        address: {
            type: String,
            required: true,
            default: '',
        },
        address_url: {
            type: String,
            required: true,
            default: '',
        },
        city: {
            type: String,
            required: true,
            default: '',
        },
        country: {
            type: String,
            required: true,
            default: '',
        },
        state: {
            type: String,
            required: true,
            default: '',
        },
        zipCode: {
            type: Number,
            required: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const DClinicInfoModal = model<DClinicInfoSchema>(CLINIC_INFO, dClinicInfoSchema);
