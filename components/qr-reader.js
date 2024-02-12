import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Fingerprint, Webcam } from 'lucide-react';
import { toast } from 'react-toastify';

export default function QrReader({ setDID }) {
    let scanner;

    function startCamera() {
        scanner = new Html5QrcodeScanner(
            'reader',
            {
                fps: 8,
                qrbox: {
                    width: 250,
                    height: 250,
                },
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true,
                },
                rememberLastUsedCamera: true,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            },
            false
        );
        if (scanner) {
            scanner.clear();
            scanner.render(onScanSuccess, onScanFailure);
        }
    }

    async function onScanSuccess(decodedResult) {
        scanner.clear();
        const result = decodedResult;

        console.log(`scanned result: ${result}`);
        setDID(result);
        toast.success('QR Code Scanned Successfully');
        return result;
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    return (
        <div className="card">
            <div className="">
                <div id="reader" className="w-auto rounded-lg"></div>

                <div className="flex m-2 border-[1.5px] p-4 rounded-lg text-center">
                    <Webcam className="flex w-6 h-6 mr-2" />
                    <button className="btn-primary" onClick={startCamera}>
                        Scan Qr code from the users Dock Mobile App
                    </button>
                </div>
            </div>
        </div>
    );
}
