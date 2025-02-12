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
const FormFieldGovId = ({ control, isCaptureCompleted, setIsCaptureCompleted }) => (
    <>
        <WebCamPhoto
            control={control}
            isCaptureCompleted={isCaptureCompleted}
            setIsCaptureCompleted={setIsCaptureCompleted} />
    </>
);

export default FormFieldGovId;
