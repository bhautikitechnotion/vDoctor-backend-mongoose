import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { FEES_STRUCTURE, USERS } from '../collections.name';

export interface DFeesStructureSchema extends Document {
    doctor_id: ObjectId;
    offline_new_case_fees: number;
    offline_ongoing_case_fees: number;
    online_new_case_fees: number;
    online_ongoing_case_fees: number;
    is_deleted: boolean;
    accepted_payment_mode: ['online', 'offline'];
}

const dFeesStructureSchema: Schema<DFeesStructureSchema> = new Schema(
    {
        doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: USERS, required: true },
        accepted_payment_mode: {
            type: [String, String],
            enum: ['online', 'offline'],
            required: true,
        },
        online_new_case_fees: {
            type: Number,
            required: true,
            default: 0,
        },
        online_ongoing_case_fees: {
            type: Number,
            required: true,
            default: 0,
        },
        offline_new_case_fees: {
            type: Number,
            required: true,
            default: 0,
        },
        offline_ongoing_case_fees: {
            type: Number,
            required: true,
            default: 0,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const DFeesStructureModal = model<DFeesStructureSchema>(FEES_STRUCTURE, dFeesStructureSchema);
