import { useQRCode } from 'next-qrcode';
import Image from 'next/image';

export const QRCodeGenerator = ({ url }) => {
    const { Canvas } = useQRCode();
    const qrCodeSize = 195;

    return (
        <div className="m-auto rounded-lg overflow-hidden ">
            <Canvas
                text={url}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 3,
                    scale: 4,
                    width: qrCodeSize,
                    color: {
                        dark: '#0E387A',
                        light: '#FFFFFF'
                    }
                }}
            />
            <Image src={'/clarity_partners.png'} alt='clarity_partners' width={230} height={36} />
        </div>
    );
};
