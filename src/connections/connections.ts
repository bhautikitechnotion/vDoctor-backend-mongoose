import { Collection } from 'mongodb';

export const collections: {
    // MASTER COLLECTION
    degreesCollection?: Collection;
    specialityCollection?: Collection;
    userTypesCollection?: Collection;
    paymentPartnersCollection?: Collection;
    platformFeesCollection?: Collection;

    // GENERAL COLLECTION
    userCollection?: Collection;
    appointmentsCollection?: Collection;
    bookmarksCollection?: Collection;
    notificationsCollection?: Collection;
    reviewsCollection?: Collection;
    stripePaymentCollection?: Collection;
    paypalPaymentCollection?: Collection;
    paymentDetailsCollection?: Collection;
    paymentRefundsCollection?: Collection;

    // DOCTOR SPECIFIC COLLECTION
    doctorProfilesCollection?: Collection;
    doctorSpecialityCollection?: Collection;
    doctorDegreesCollection?: Collection;
    clinicInfoCollection?: Collection;
    doctorsAvailabilityCollection?: Collection;
    timeSlotsCollection?: Collection;
    diagnosisQuestionsCollection?: Collection;
    feesStructureCollection?: Collection;
    doctorEarningsCollection?: Collection;
    doctorHolidaysCollection?: Collection;

    // PATIENT SPECIFIC COLLECTION
    patientsProfilesCollection?: Collection;
    prescriptionsCollection?: Collection;
    testReportsCollection?: Collection;
    labReportsCollection?: Collection;

    // ADMIN SPECIFIC COLLECTION
    paymentsRolloutCollection?: Collection;
    termsAndConditionsCollection?: Collection;
} = {};
