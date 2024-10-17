export interface ReturnResponse {
    message: string;
    data: any[];
    success: boolean;
}

export interface PaymentSessionData {
    appointmentId: string;
    unique_id: number;
    doctorFees: number;
    patient_id: string;
    doctor_id: string;
    appointmentMode: string;
    appointmentType: string;
}

export interface RefundPayment {
    success: boolean;
    data: any;
}

export interface RefundPaymentBody {
    sessionId: string;
    appointmentId: string;
    patient_id: string;
}
