import { useQRCode } from 'next-qrcode';

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
        </div>
    );
};
