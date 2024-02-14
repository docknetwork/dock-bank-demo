import React from 'react';
import { Separator } from 'components/ui/separator';
import { QRCodeGenerator } from 'components/qr-generator';
import useQrCode from 'hooks/useQrCode';
import BankCredentials from './org/quotient/bank-credentials';
/**
 * @description Bank QR code authenticator.
 * @todo setUserInfo param
 * @param {*} setUserInfo setter once qr code triggered from mobile app and returns user info
 * @memberof QuotientBankForm, UrbanScapePage
 * @returns React.FC 
 */
const BankQrAuthentication = ({ proofTemplateId }) => {
    const { qrCodeUrl } = useQrCode({ proofTemplateId });

    return (
        <div className='grid gap-2 p-4 bg-neutral-50 rounded-lg space-y-5 h-fit'>
            <h2 className='font-semibold text-lg'>Authenticate with your mobile banking app and providing the needed credentials including a validated credit score over 600.</h2>
            <Separator />
            <p className='text-start font-semibold text-lg'>Scan the QR code below with your mobile banking app.</p>

            {qrCodeUrl !== '' ? (<QRCodeGenerator url={qrCodeUrl} />) : null}
            <Separator />
            <div>
                <h3 className='font-semibold text-lg mb-5'>Required credentials:</h3>
                <BankCredentials />
            </div>
        </div>
    );
};

export default BankQrAuthentication;
