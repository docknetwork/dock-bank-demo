import React from 'react';
import { Separator } from 'components/ui/separator';
import CredentialCards from './org/quotient/bank-credentials';
import VerifyQrCode from 'components/verify-qr-code';
import qrCodeStore from 'store/qrCodeStore';

const QrCodeAuthentication = ({ proofTemplateId, title = '', qrText = '', qrTextAfter = '' }) => {

    const verified = qrCodeStore((state) => state.verified);

    return (
        <div className='bg-neutral-50 rounded-lg space-y-5 h-fit p-5'>
            {(title !== null && title !== '') && <div>
                <h2 className='font-semibold mb-5'>{title}</h2>
                <Separator />
            </div>
            }
            {!verified && (
                <>
                    {(qrText !== null && qrText !== '') && (
                        <div>
                            <p className='text-start font-semibold'>{qrText}</p>
                        </div>
                    )}

                    <VerifyQrCode proofTemplateId={proofTemplateId} />

                    {(qrTextAfter !== null && qrTextAfter !== '') && (
                        <div>
                            <p className='text-start font-semibold mb-5'>{qrTextAfter}</p>
                            <Separator />
                        </div>
                    )}
                </>
            )}

            <div>
                <div className='mb-5'>
                    <h3 className='font-bold'>Required credentials:</h3>
                </div>
                <CredentialCards />
            </div>
        </div>
    );
};

export default QrCodeAuthentication;
