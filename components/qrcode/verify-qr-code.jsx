import { useEffect } from 'react';
import useQrCode from 'hooks/useQrCode';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { toast } from 'sonner';
import qrCodeStore from 'store/qrCodeStore';
import { Loader2, RefreshCw } from 'lucide-react';

const VerifyQrCode = ({ proofTemplateId }) => {
    const qrCodeUrl = qrCodeStore((state) => state.qrCodeUrl);
    const verified = qrCodeStore((state) => state.verified);
    const isLoading = qrCodeStore((state) => state.isLoading);
    const verificationError = qrCodeStore((state) => state.verificationError);
    const { refetch } = useQrCode({ proofTemplateId });

    useEffect(() => {
        if (verified === true) {
            toast.success('Verification Success!');
            return
        }

        if (verificationError) {
            console.log('refetching new Qr code...');
            refetch();
        }
    }, [verified, refetch, verificationError]);

    return (
        <>
            {isLoading ? (
                <div className='valign-middle' style={{ height: '195px', width: '100%' }}>
                    <div className='ta-c'>
                        <Loader2 className="h-10 w-10 animate-spin mb-4" />
                        <h1 className='text-xl font-bold'>Generating Qr code..</h1>
                    </div>
                </div>
            ) : (
                qrCodeUrl !== '' && !verified ? (
                    <div className='m-auto ta-c relative w-fit'>
                        <QRCodeGenerator url={qrCodeUrl} />
                        <RefreshCw className='h-7 w-7 text-urban cursor-pointer absolute -top-5 -right-5' onClick={() => refetch()} />
                    </div>
                ) : <div className='m-auto ta-c relative w-fit'>
                    <RefreshCw className='h-7 w-7 text-urban cursor-pointer' onClick={() => refetch()} />
                </div>
            )}
        </>
    );
};

export default VerifyQrCode;
