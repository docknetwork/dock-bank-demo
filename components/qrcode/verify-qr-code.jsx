import { useEffect } from 'react';
import useQrCode from 'hooks/useQrCode';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { useVerifyProof } from 'hooks/useVerifyProof';
import { toast } from "sonner"
import { Button } from '../ui/button';
import qrCodeStore from 'store/qrCodeStore';
import { Loader2 } from 'lucide-react';


const VerifyQrCode = ({ proofTemplateId }) => {

    const qrCodeUrl = qrCodeStore((state) => state.qrCodeUrl);
    const verified = qrCodeStore((state) => state.verified);
    const isLoading = qrCodeStore((state) => state.isLoading);
    const { refetch } = useQrCode({ proofTemplateId });
    const { verificationError } = useVerifyProof();

    useEffect(() => {
        if (verified === true) { toast.success('Verification Success!') }
        if (verificationError) {
            console.log('refetching...');
            refetch()
        }
    }, [verified])

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
                    <div className='m-auto ta-c'>
                        <QRCodeGenerator url={qrCodeUrl} />
                        <Button variant='outline' onClick={() => refetch()}>Create new</Button>
                    </div>
                ) : null
            )}
        </>
    )

}

export default VerifyQrCode