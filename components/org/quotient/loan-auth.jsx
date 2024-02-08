import React from 'react';
import { Separator } from 'components/ui/separator';
import BankCredentials from './bank-credentials';

/**
 * @description Quotient apply to loan QR code authenticator.
 * @todo setUserInfo param
 * @param {*} setUserInfo setter once qr code triggered from mobile app and returns user info
 * @param {*} isAuth shows BankCredentials
 * @memberof QuotientBankForm 
 * @returns React.FC 
 */
const LoanQrAuthentication = ({ isAuth = false, setUserInfo }) => (
    <div className='grid gap-2 p-4 bg-neutral-50 rounded-lg space-y-5 h-fit'>
        <h2>Authenticate with your mobile banking app and providing the needed credentials including a validated credit score over 600.</h2>
        <Separator />
        <p className='text-start'>Scan the QR code below with your terive mobile banking app.</p>
        <div className='justify-self-center'>QR CODE HERE</div>
        <Separator />
        <div>
            <h3>Required credentials:</h3>
            <BankCredentials checked={isAuth} />
        </div>
    </div>
);

export default LoanQrAuthentication;
