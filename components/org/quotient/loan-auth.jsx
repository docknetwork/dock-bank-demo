import React, { useEffect, useState } from 'react';
import { Separator } from 'components/ui/separator';
import useQrCode from 'utils/useQrCode';
import { QRCodeGenerator } from 'components/qr-generator';
import { useVerifyProof } from 'utils/useVerifyProof';
import BankCredentials from './bank-credentials';
import { toast } from "sonner"

/**
 * @description Quotient apply to loan QR code authenticator.
 * @todo setUserInfo param
 * @param {*} setUserInfo setter once qr code triggered from mobile app and returns user info
 * @param {*} isAuth shows BankCredentials
 * @memberof QuotientBankForm 
 * @returns React.FC 
 */
const LoanQrAuthentication = ({ proofTemplateId }) => {

    const { qrCodeUrl, proofID } = useQrCode({ proofTemplateId });
    const { verified } = useVerifyProof(qrCodeUrl, proofID);

    useEffect(() => {
        if (verified === true) { toast.success('Verification Success!') }
    }, [verified])

    return (
        <div className='grid gap-2 p-5 bg-neutral-50 rounded-lg space-y-5 h-fit w-30'>
            <h2 className='font-semibold'>Authenticate with your mobile banking app and providing the needed credentials including a validated credit score over 600.</h2>
            <Separator />
            <p className='text-start font-semibold'>Scan the QR code below with your terive mobile banking app.</p>

            {qrCodeUrl !== '' && !verified ? (<QRCodeGenerator url={qrCodeUrl} />) : null}

            <Separator />
            <div>
                <div className='mb-5'>
                    <h3 className='font-bold'>Required credentials:</h3>
                </div>
                <BankCredentials verified={verified} />
            </div>
        </div>
    );
};

export default LoanQrAuthentication;
