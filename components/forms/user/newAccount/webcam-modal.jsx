import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from 'components/ui/dialog';
import Image from 'next/image';
import { Button } from 'components/ui/button';
import { useState } from 'react';

/**
 * @description Modal for mocked web cam 
 * @param {*} isCaptureCompleted  react hook form controller
 * @param {*} isCaptureCompleted  react hook form controller
 * @memberof WebCamPhoto
 * @returns React.FC Dialog
 */
const WebCamModal = ({ isCaptureCompleted, setIsCaptureCompleted }) => {
    const [isPicTaken, setIsPicTaken] = useState(false);

    //
    const handleOnComplete = () => {
        setIsPicTaken(!isPicTaken);
        setTimeout(() => setIsCaptureCompleted(!isCaptureCompleted), 1000);
    };

    const handleOnOpenChanged = () => {
        if (isPicTaken) setIsPicTaken(false);
    };

    return (
        <Dialog onOpenChange={handleOnOpenChanged}>
            <DialogTrigger asChild>
                <Button variant="outline">Take Photo</Button>
            </DialogTrigger>
            <DialogContent>
                {isPicTaken ? (
                    <h2 className='text-center text-blue-900 font-semibold text-lg'>Capture Complete</h2>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogDescription className="text-center font-semibold">
                                Position your head so that your whole face is visible in the oval. Move head left and right, up and down.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='p-4 grid justify-items-center'>
                            <Image src="/webcam_oval.png" alt='webcam_oval' width={200} height={200} />
                        </div>
                        <Button variant="outline" onClick={handleOnComplete}>Start Capture</Button>
                    </>
                )}
                <div className='grid justify-items-center gap-2'>
                    <p className='text-sm'>Powered by IdentityClarity</p>
                    <Image src="/id_clarity.png" alt='id_clarity' width={87} height={24} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WebCamModal;
