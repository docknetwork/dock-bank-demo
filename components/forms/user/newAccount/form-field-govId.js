import React, { useState } from 'react';
import Image from 'next/image';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/ui/form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';

const FormFieldGovId = ({ control, isCaptureCompleted, setIsCaptureCompleted, imageSrc, setImageSrc }) => (
    <div className='grid gap-2 h-full'>
        <PassportOrDriversId
            control={control}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc} />
        <WebCamPhoto
            control={control}
            isCaptureCompleted={isCaptureCompleted}
            setIsCaptureCompleted={setIsCaptureCompleted} />
    </div>
);

const PassportOrDriversId = ({ control, imageSrc, setImageSrc }) => {
    const handleUploadClick = async (event) => {
        event.preventDefault();
        // Set the field value to the file
        setImageSrc('/example_passport.png');
    };

    return (
        <div className="p-4 bg-neutral-50 rounded-lg">
            <FormField
                control={control}
                name="govId"
                render={({ field }) => (
                    <FormItem>
                        <div className='flex items-center justify-between '>
                            <FormLabel>Upload Passport or Drivers License</FormLabel>
                            <Image src="/id_clarity.png" alt='id_clarity' width={80} height={20} />
                        </div>
                        <FormControl>
                            {imageSrc !== undefined ? (
                                <div className='grid p-4'>
                                    <Image src={imageSrc} alt='example_passport' width={250} height={250} />
                                </div>
                            ) : (
                                <div className='grid justify-items-center gap-4'>
                                    <Image src="/upload_file.png" alt='upload_file' width={120} height={120} />
                                    <Button variant="outline" onClick={handleUploadClick}>Upload Government Issued ID</Button>
                                </div>
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
        </div>
    );
};

const WebCamPhoto = ({ control, isCaptureCompleted, setIsCaptureCompleted }) => (
    <div className="p-4 bg-neutral-50 rounded-lg">
        <FormField
            control={control}
            name="webcamPic"
            render={({ field }) => (
                <FormItem>
                    <div className='flex items-center justify-between'>
                        <FormLabel>Take a webcam photo for KYC check</FormLabel>
                        <Image src="/id_clarity.png" alt='id_clarity' width={80} height={20} />
                    </div>
                    <FormControl>
                        {isCaptureCompleted ? (
                            <div className='grid place-items-center'>
                                <Image src="/example_webcam.png" alt='example_webcam' width={240} height={240} />
                            </div>
                        ) : (
                            <div className='grid justify-items-center gap-4'>
                                <Image src="/background_replace.png" alt='background_replace' width={120} height={120} />
                                <WebCamModal
                                    isCaptureCompleted={isCaptureCompleted}
                                    setIsCaptureCompleted={setIsCaptureCompleted}
                                />
                            </div>
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    </div>
);

const WebCamModal = ({ isCaptureCompleted, setIsCaptureCompleted }) => {
    const [isPicTaken, setIsPicTaken] = useState(false);

    const handleOnComplete = () => {
        setIsPicTaken(!isPicTaken);
        setTimeout(() => setIsCaptureCompleted(!isCaptureCompleted), 3000);
    };

    const handleOnOpenChanged = () => {
        if (isPicTaken) {
            setIsPicTaken(!isPicTaken);
        }
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
                    <Image src="/id_clarity.png" alt='id_clarity' width={80} height={20} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default FormFieldGovId;
