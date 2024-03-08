import React from 'react';
import { Separator } from 'components/ui/separator';
import VerifyQrCode from 'components/qrcode/verify-qr-code';
import qrCodeStore from 'store/qrCodeStore';
import useQrCode from 'hooks/useQrCode';
import { RefreshCw } from 'lucide-react';
import { useVerifyProof } from 'hooks/useVerifyProof';
import CredentialCards from '../org/quotient/bank-credentials';

const QrCodeAuthentication = ({ proofTemplateId, title = '', qrText = '', qrTextAfter = '', onlyCreditScore = false, required = true }) => {
    const verified = qrCodeStore((state) => state.verified);
    const { refetch } = useQrCode({ proofTemplateId });
    useVerifyProof();

    return (
        <div className='bg-neutral-50 rounded-lg space-y-5 h-fit p-5'>
            {(title !== null && title !== '') && <div>
                <h2 className='text-2xl font-semibold mb-5'>{title}</h2>
                <Separator />
            </div>
            }
            {!verified ? (
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
            ) :
                <div className='m-auto ta-c relative w-fit'>
                    <RefreshCw className='h-7 w-7 text-urban cursor-pointer' onClick={() => refetch()} />
                </div>
            }

            <div>
                <CredentialCards onlyCreditScore={onlyCreditScore} required={required} />
            </div>
        </div>
    );
};

export default QrCodeAuthentication;
