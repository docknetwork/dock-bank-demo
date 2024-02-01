import QrReader from "./qr-reader"

export const QRCodeVerification = () => {
    return (
        <div className="w-full">
            <div className="space-x-4">
                <QrReader />
            </div>
        </div>
    )
}