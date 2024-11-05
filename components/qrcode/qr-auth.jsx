import React from 'react';
import Image from 'next/image';
import { Separator } from 'components/ui/separator';
import VerifyQrCode from 'components/qrcode/verify-qr-code';
import qrCodeStore from 'store/qrCodeStore';
import useQrCode from 'hooks/useQrCode';
import { RefreshCw } from 'lucide-react';
import { useVerifyProof } from 'hooks/useVerifyProof';
import CredentialCards from '../org/quotient/bank-credentials';

const QrCodeAuthentication = ({ proofTemplateId, title = '', qrText = '', qrTextAfter = '', onlyCreditScore = false, required = true, filteredCredentials }) => {
    const verified = qrCodeStore((state) => state.verified);
    const { refetch } = useQrCode({ proofTemplateId });
    useVerifyProof();

    return (
        <div className='p-5 space-y-5 rounded-lg bg-neutral-50 h-fit'>
            {(title !== null && title !== '') && <div>
                <h2 className='mb-5 font-semibold'>{title}</h2>
                <Separator />
            </div>
            }
            {!verified ? (
                <>
                    {(qrText !== null && qrText !== '') && (
                        <div>
                            <h2 className='mb-5 text-2xl font-semibold'>{qrText}</h2>
                        </div>
                    )}

                    <VerifyQrCode proofTemplateId={proofTemplateId} />
                    <div className='relative m-auto ta-c w-fit'>
                        <Image 
                            src={'/clarity_partners.png'} 
                            alt='clarity_partners' 
                            width={230} 
                            height={36} 
                            />
                    </div>
                    {(qrTextAfter !== null && qrTextAfter !== '') && (
                        <div>
                            <p className='mb-5 font-semibold text-start'>{qrTextAfter}</p>
                            <Separator />
                        </div>
                    )}
                </>
            ) :
                <div className='relative m-auto ta-c w-fit'>
                    <RefreshCw className='cursor-pointer h-7 w-7 text-urban' onClick={() => refetch()} />
                </div>
            }

            <div>
                <CredentialCards onlyCreditScore={onlyCreditScore} required={required} filteredCredentials={filteredCredentials} />
            </div>
        </div>
    );
};

export default QrCodeAuthentication;
