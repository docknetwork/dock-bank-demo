import React from 'react';
import { Separator } from 'components/ui/separator';
import { QRCodeGenerator } from 'components/qr-generator';
import useQrCode from 'utils/useQrCode';
import BankCredentials from './org/quotient/bank-credentials';
/**
 * @description Bank QR code authenticator.
 * @todo setUserInfo param
 * @param {*} setUserInfo setter once qr code triggered from mobile app and returns user info
 * @param {*} isAuth shows BankCredentials
 * @memberof QuotientBankForm, UrbanScapePage
 * @returns React.FC 
 */
const BankQrAuthentication = ({ isAuth = false, proofTemplateId }) => {
    const { qrCodeUrl } = useQrCode({ proofTemplateId });

    return (
        <div className='grid gap-2 p-4 bg-neutral-50 rounded-lg space-y-5 h-fit'>
            <h2>Authenticate with your mobile banking app and providing the needed credentials including a validated credit score over 600.</h2>
            <Separator />
            <p className='text-start'>Scan the QR code below with your mobile banking app.</p>

            {qrCodeUrl !== '' ? (<QRCodeGenerator url={qrCodeUrl} />) : null}
            <Separator />
            <div>
                <h3>Required credentials:</h3>
                <BankCredentials isAuth={isAuth} />
            </div>
        </div>
    );
};

export default BankQrAuthentication;
