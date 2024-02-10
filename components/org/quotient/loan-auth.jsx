import React, { useEffect, useState } from 'react';
import { Separator } from 'components/ui/separator';
import { generateQR } from 'utils/generate-qr';
import { QRCodeGenerator } from 'components/qr-generator';
import BankCredentials from './bank-credentials';

/**
 * @description Quotient apply to loan QR code authenticator.
 * @todo setUserInfo param
 * @param {*} setUserInfo setter once qr code triggered from mobile app and returns user info
 * @param {*} isAuth shows BankCredentials
 * @memberof QuotientBankForm 
 * @returns React.FC 
 */
const LoanQrAuthentication = ({ isAuth = false, setUserInfo }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const proofTemplateID = 'b156507a-949f-4dff-ab2f-ba98ea840678';

    const handleGenerateQR = async () => {
        const response = await generateQR(proofTemplateID);
        console.log('handleGenerateQR', { response });
        setQrCodeUrl(response.qr);
    };

    useEffect(() => {
        if (qrCodeUrl === '') handleGenerateQR();
    }, [qrCodeUrl]);

    return (
        <div className='grid gap-2 p-5 bg-neutral-50 rounded-lg space-y-5 h-fit w-30'>
            <h2 className='font-semibold'>Authenticate with your mobile banking app and providing the needed credentials including a validated credit score over 600.</h2>
            <Separator />
            <p className='text-start font-semibold'>Scan the QR code below with your terive mobile banking app.</p>

            {qrCodeUrl !== '' ? (<QRCodeGenerator url={qrCodeUrl} />) : null}
            <Separator />
            <div>
                <div className='mb-5'>
                <h3 className='font-bold'>Required credentials:</h3>
                </div>
                <BankCredentials checked={isAuth} />
            </div>
        </div>
    );
};

export default LoanQrAuthentication;
