import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { DOCTORS_AVAILABILITY, USERS } from '../collections.name';

export interface DTimingsSchema {
    day: string;
    isAvailable: boolean;
    availability: ['online', 'offline'];
    startTime: Date;
    endTime: Date;
    timeSlots: string[];
}

export interface DAvailabilitySchema extends Document {
    doctor_id: ObjectId;
    bufferTime: number;
    slotDuration: number;
    timings: DTimingsSchema[];
    is_deleted: boolean;
}

const timingSchema: Schema<DTimingsSchema> = new Schema(
    {
        day: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            required: true,
        },
        availability: {
            type: [String],
            enum: ['online', 'offline'],
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        timeSlots: {
            type: [String],
            required: true,
        },
    },
    { _id: false },
);

const dAvailabilitySchema: Schema<DAvailabilitySchema> = new Schema(
    {
        doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: USERS, required: true },
        bufferTime: {
            type: Number,
            required: true,
            default: 0,
        },
        slotDuration: {
            type: Number,
            required: true,
            default: 0,
        },
        timings: [timingSchema],
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const DAvailabilityModal = model<DAvailabilitySchema>(DOCTORS_AVAILABILITY, dAvailabilitySchema);
