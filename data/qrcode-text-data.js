const qrCodeVerificationData = {
    LOAN: {
        title: 'Instant approval by authenticating with your mobile banking app and providing the needed credentials including a validated credit score over 700.',
        qrText: 'Scan the QR code below with your Quotient mobile banking app.',
        qrTextAfter: null
    },
    BANK: {
        title: null,
        qrText: 'Scan this QR code with your mobile bank app to log in the app and receive these benefits.',
        qrTextAfter: 'You will be required to provide a biometric on your mobile device in order to receive these credentials.'
    },
    URBAN_BANKBIO: {
        title: 'Automate approval by using your mobile banking app to complete this form with verified information. Approval guaranteed with a credit score over 600.',
        qrText: 'Scan the QR code below with your Quotient mobile banking app.',
        qrTextAfter: null
    },
    URBAN_CREDITSCORE: {
        title: null,
        qrText: 'Scan QR code with your mobile app to see if you qualify for a waived deposit.',
        qrTextAfter: null
    },

};

export default qrCodeVerificationData;
