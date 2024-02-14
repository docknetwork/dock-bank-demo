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
import WebCamPhoto from './webcam-photo';

/**
 * @description Form Field for user passport | driver id, web cam photo
 * @param {*} control  react hook form controller
 * @param {*} isCaptureCompleted shows WebCamPhoto comp
 * @param {*} setIsCaptureCompleted setter 'isCaptureCompleted'
 * @param {*} setIsUploadPoDComplete setter 'isUploadPoDComplete' (passport or driver id)
 * @memberof QuotientBankForm
 * @returns React.FC Form Field
 */
const FormFieldGovId = ({ control, isCaptureCompleted, setIsCaptureCompleted, setIsUploadPoDComplete }) => (
    <>
        <PassportOrDriversId
            control={control}
            setIsUploadPoDComplete={setIsUploadPoDComplete} />
        <WebCamPhoto
            control={control}
            isCaptureCompleted={isCaptureCompleted}
            setIsCaptureCompleted={setIsCaptureCompleted} />
    </>
);

const PassportOrDriversId = ({ control, setIsUploadPoDComplete }) => {
    const handleUploadClick = async (event) => {
        event.preventDefault();
        setIsUploadPoDComplete(true);
    };

    return (
        <div className="p-4 bg-neutral-50 rounded-lg h-50 mb-5">
            <FormField
                control={control}
                name="govId"
                render={({ field }) => (
                    <FormItem className="h-full relative">
                        <div className='flex items-center justify-between '>
                            <FormLabel className="font-semibold">Upload Passport or Drivers License</FormLabel>
                            <Image src="/id_clarity.png" alt='id_clarity' width={87} height={24} />
                        </div>
                        <FormControl>
                            {field.value !== '' ? (
                                <div className='grid p-4 pt-16'>
                                    <Image src={field.value} alt='example_passport' width={392} height={248} />
                                </div>
                            ) : (
                                <div className='text-center h-full'>
                                    <div className='w-full pt-16 pb-5'>
                                        <div>
                                            <Image className='m-auto' src="/upload_file.png" alt='upload_file' width={149} height={186} />
                                        </div>
                                    </div>
                                    <div className='absolute bottom-0 left-0 right-0 m-auto '>
                                        <Button className='uploadBtn' variant="outline" onClick={handleUploadClick}>Upload Government Issued ID</Button>
                                    </div>
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
