import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Fingerprint, Webcam } from "lucide-react";  // Make sure you have the correct import statement for lucide-react
import { useState } from "react";
import { toast } from "sonner";

export default function QrReader() {
    const [scannedDid, setScannedDid] = useState("");

    let scanner;

    function startCamera() {
        scanner = new Html5QrcodeScanner(
            "reader",
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
        const result = extractQRData(decodedResult);

        toast.success("QR Code Scanned Successfully", result);
        console.log(result);

        setScannedDid(result);

        return result;
    }

    const extractQRData = (decodedResult) => {
        return decodedResult;
    };

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    return (
        <div className="card lg:card-side">
            <div className="">
                <div id="reader" className="w-auto my-4 rounded-lg"></div>

                <div className="flex m-2 border-[1.5px] p-4 rounded-lg">
                    <Webcam className="flex w-6 h-6 mr-2" />
                    <button className="btn-primary" onClick={startCamera}>
                        Scan Qr code from the users Dock Mobile App
                    </button>
                </div>

                <br />
                {scannedDid && (
                    <>
                        <p className="text-center mr-2">
                            <Fingerprint className="w-10 h-10 mr-2" />
                            <span className="font-bold">{scannedDid}</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
