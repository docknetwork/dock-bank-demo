import React from 'react';
import { Separator } from 'components/ui/separator';
import BankCredentials from './org/quotient/bank-credentials';
import VerifyQrCode from 'components/verify-qr-code';

/**
 * @description Quotient apply to loan QR code authenticator.
 * @todo setUserInfo param
 * @param {*} setUserInfo setter once qr code triggered from mobile app and returns user info
 * @param {*} isAuth shows BankCredentials
 * @memberof QuotientBankForm 
 * @returns React.FC 
 */
const QrCodeAuthentication = ({ proofTemplateId, title = '', qrText = '', qrTextAfter = '' }) => {

    return (
        <div className='grid gap-2 p-5 bg-neutral-50 rounded-lg space-y-5 h-fit w-30'>
            {title !== '' && <div>
                <h2 className='font-semibold'>{title}</h2>
                <Separator />
            </div>
            }

            {qrText !== '' && <div>
                <p className='text-start font-semibold'>{qrText}</p>
            </div>
            }

            <VerifyQrCode
                proofTemplateId={proofTemplateId}
            />

            {qrTextAfter !== '' && <div>
                <p className='text-start font-semibold'>{qrTextAfter}</p>
            </div>
            }
            <Separator />
            <div>
                <div className='mb-5'>
                    <h3 className='font-bold'>Required credentials:</h3>
                </div>
                <BankCredentials />
            </div>
        </div>
    );
};

export default QrCodeAuthentication;
