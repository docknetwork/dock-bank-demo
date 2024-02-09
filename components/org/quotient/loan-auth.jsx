import React, { useEffect, useState } from 'react';
import { Separator } from 'components/ui/separator';
import BankCredentials from './bank-credentials';
// import { generateQR } from 'utils/generate-qr';
// import { QRCodeGenerator } from 'components/qr-generator';

/**
 * @description Quotient apply to loan QR code authenticator.
 * @todo setUserInfo param
 * @param {*} setUserInfo setter once qr code triggered from mobile app and returns user info
 * @param {*} isAuth shows BankCredentials
 * @memberof QuotientBankForm 
 * @returns React.FC 
 */
const LoanQrAuthentication = ({ isAuth = false, setUserInfo }) => {

    // const [qrCodeUrl, setQrCodeUrl] = useState('')
    // const proofTemplateID = "b156507a-949f-4dff-ab2f-ba98ea840678"

    // useEffect(async () => {
    //     const handleGenerateQR = async () => {
    //         const { response } = await generateQR(proofTemplateID);
    //         setQrCodeUrl(response.qr);
    //     };
    //     await handleGenerateQR()
    // }, [])

    return (
        <div className='grid gap-2 p-4 bg-neutral-50 rounded-lg space-y-5 h-fit'>
            <h2>Authenticate with your mobile banking app and providing the needed credentials including a validated credit score over 600.</h2>
            <Separator />
            <p className='text-start'>Scan the QR code below with your terive mobile banking app.</p>

            {/* <QRCodeGenerator url={qrCodeUrl} /> */}
            <Separator />
            <div>
                <h3>Required credentials:</h3>
                <BankCredentials checked={isAuth} />
            </div>
        </div>
    )
};

export default LoanQrAuthentication;
