import { useQRCode } from "next-qrcode";

export const QRCodeGenerator = ({ url }) => {
    const { Canvas } = useQRCode();
    const qrCodeSize = 390;

    return (
        <div className="w-full rounded-lg overflow-hidden shadow-lg ">
            <Canvas
                text={url}
                options={{
                    errorCorrectionLevel: "M",
                    margin: 3,
                    scale: 4,
                    width: qrCodeSize,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF"
                    }
                }}
            />
        </div>
    );
};