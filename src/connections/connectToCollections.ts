import { Collection, Db } from 'mongodb';
import {
    APPOINTMENTS,
    BOOKMARKS,
    CLINIC_INFO,
    DEGREES,
    DIAGNOSIS_QUESTIONS,
    DOCTORS_AVAILABILITY,
    DOCTORS_EARNINGS,
    DOCTOR_DEGREES,
    DOCTOR_HOLIDAYS,
    DOCTOR_PROFILES,
    DOCTOR_SPECIALTIES,
    FEES_STRUCTURE,
    LAB_REPORTS,
    NOTIFICATIONS,
    PATIENT_PROFILES,
    PAYMENTS_ROLLOUT,
    PAYMENT_DETAILS,
    PAYMENT_PARTNERS,
    PAYMENT_REFUNDS,
    PAYPAL_PAYMENTS,
    PLATFORM_FEES,
    PRESCRIPTIONS,
    REVIEWS,
    SPECIALITY,
    STRIPE_PAYMENTS,
    TERMSNCONDITIONS,
    TEST_REPORTS,
    TIME_SLOTS,
    USERS,
    USER_TYPES,
} from './collections.name';
import { collections } from './connections';

export const ConnectToCollections = async (dataBase: Db) => {
    // MASTER COLLECTION VARIABLES
    const degreesCollection: Collection = dataBase.collection(DEGREES);
    const specialityCollection: Collection = dataBase.collection(SPECIALITY);
    const userTypesCollection: Collection = dataBase.collection(USER_TYPES);
    const paymentPartnersCollection: Collection = dataBase.collection(PAYMENT_PARTNERS);
    const platformFeesCollection: Collection = dataBase.collection(PLATFORM_FEES);

    // GENERAL COLLECTION VARIABLES
    const userCollection: Collection = dataBase.collection(USERS);
    const appointmentsCollection: Collection = dataBase.collection(APPOINTMENTS);
    const bookmarksCollection: Collection = dataBase.collection(BOOKMARKS);
    const notificationsCollection: Collection = dataBase.collection(NOTIFICATIONS);
    const reviewsCollection: Collection = dataBase.collection(REVIEWS);
    const stripePaymentCollection: Collection = dataBase.collection(STRIPE_PAYMENTS);
    const paypalPaymentCollection: Collection = dataBase.collection(PAYPAL_PAYMENTS);
    const paymentDetailsCollection: Collection = dataBase.collection(PAYMENT_DETAILS);
    const paymentRefundsCollection: Collection = dataBase.collection(PAYMENT_REFUNDS);

    // DOCTOR COLLECTION
    const doctorProfilesCollection: Collection = dataBase.collection(DOCTOR_PROFILES);
    const doctorSpecialityCollection: Collection = dataBase.collection(DOCTOR_SPECIALTIES);
    const doctorDegreesCollection: Collection = dataBase.collection(DOCTOR_DEGREES);
    const clinicInfoCollection: Collection = dataBase.collection(CLINIC_INFO);
    const doctorsAvailabilityCollection: Collection = dataBase.collection(DOCTORS_AVAILABILITY);
    const timeSlotsCollection: Collection = dataBase.collection(TIME_SLOTS);
    const diagnosisQuestionsCollection: Collection = dataBase.collection(DIAGNOSIS_QUESTIONS);
    const feesStructureCollection: Collection = dataBase.collection(FEES_STRUCTURE);
    const doctorEarningsCollection: Collection = dataBase.collection(DOCTORS_EARNINGS);
    const doctorHolidaysCollection: Collection = dataBase.collection(DOCTOR_HOLIDAYS);

    // PATIENT COLLECTION
    const patientsProfilesCollection: Collection = dataBase.collection(PATIENT_PROFILES);
    const prescriptionsCollection: Collection = dataBase.collection(PRESCRIPTIONS);
    const testReportsCollection: Collection = dataBase.collection(TEST_REPORTS);
    const labReportsCollection: Collection = dataBase.collection(LAB_REPORTS);

    // ADMIN COLLECTION
    const paymentsRolloutCollection: Collection = dataBase.collection(PAYMENTS_ROLLOUT);
    const termsAndConditionsCollection: Collection = dataBase.collection(TERMSNCONDITIONS);

    // adding properties to collections object
    // MASTER COLLECTION
    collections.degreesCollection = degreesCollection;
    collections.specialityCollection = specialityCollection;
    collections.userTypesCollection = userTypesCollection;
    collections.paymentPartnersCollection = paymentPartnersCollection;
    collections.platformFeesCollection = platformFeesCollection;

    // GENERAL COLLECTION
    collections.userCollection = userCollection;
    collections.appointmentsCollection = appointmentsCollection;
    collections.bookmarksCollection = bookmarksCollection;
    collections.notificationsCollection = notificationsCollection;
    collections.reviewsCollection = reviewsCollection;
    collections.stripePaymentCollection = stripePaymentCollection;
    collections.paypalPaymentCollection = paypalPaymentCollection;
    collections.paymentDetailsCollection = paymentDetailsCollection;
    collections.paymentRefundsCollection = paymentRefundsCollection;

    // DOCTOR COLLECTION
    collections.doctorProfilesCollection = doctorProfilesCollection;
    collections.doctorSpecialityCollection = doctorSpecialityCollection;
    collections.doctorDegreesCollection = doctorDegreesCollection;
    collections.clinicInfoCollection = clinicInfoCollection;
    collections.doctorsAvailabilityCollection = doctorsAvailabilityCollection;
    collections.timeSlotsCollection = timeSlotsCollection;
    collections.diagnosisQuestionsCollection = diagnosisQuestionsCollection;
    collections.feesStructureCollection = feesStructureCollection;
    collections.doctorEarningsCollection = doctorEarningsCollection;
    collections.doctorHolidaysCollection = doctorHolidaysCollection;

    // PATIENT COLLECTION
    collections.patientsProfilesCollection = patientsProfilesCollection;
    collections.prescriptionsCollection = prescriptionsCollection;
    collections.testReportsCollection = testReportsCollection;
    collections.labReportsCollection = labReportsCollection;

    // ADMIN COLLECTION
    collections.paymentsRolloutCollection = paymentsRolloutCollection;
    collections.termsAndConditionsCollection = termsAndConditionsCollection;
};
