import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { DIAGNOSIS_QUESTIONS, USERS } from '../collections.name';

interface QuestionsSchema {
    ansType: string;
    question: string;
}

export interface DDiagnosisQuestionsSchema extends Document {
    doctor_id: ObjectId;
    questions: QuestionsSchema[];
    is_deleted: boolean;
}

const questionsSchema: Schema<QuestionsSchema> = new Schema(
    {
        ansType: { type: String, enum: ['descriptive', 'boolean'], required: true },
        question: { type: String, required: true },
    },
    { _id: false },
);

const dDiagnosisQuestionSchema: Schema<DDiagnosisQuestionsSchema> = new Schema(
    {
        doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: USERS, required: true },
        questions: [questionsSchema],
    },
    { timestamps: true },
);

export const UsersModal = model<DDiagnosisQuestionsSchema>(DIAGNOSIS_QUESTIONS, dDiagnosisQuestionSchema);
