import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { DOCTORS_EARNINGS, USERS } from '../collections.name';

export interface DEarningsSchema extends Document {
    doctor_id: ObjectId;
    balance: number;
    is_deleted: boolean;
}

const dEarningSchema: Schema<DEarningsSchema> = new Schema(
    {
        doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: USERS, required: true },
        balance: {
            type: Number,
            required: true,
            default: 0,
        },
        is_deleted: {
            type: Boolean,
            required: false,
        },
    },
    { timestamps: true },
);

export const DEarningsModal = model<DEarningsSchema>(DOCTORS_EARNINGS, dEarningSchema);
