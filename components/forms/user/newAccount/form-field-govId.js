import React from 'react';
import Image from 'next/image';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/ui/form';
import { Button } from 'components/ui/button';
import WebCamPhoto from './WebCamPhoto';

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

export default FormFieldGovId;
