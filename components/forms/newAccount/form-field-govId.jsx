import React from 'react';
import WebCamPhoto from './webcam-photo';
import WebCamPassport from './webcam-passport';

/**
 * @description Form Field for user passport | driver id, web cam photo
 * @param {*} control  react hook form controller
 * @param {*} isCaptureCompleted shows WebCamPhoto comp
 * @param {*} setIsCaptureCompleted setter 'isCaptureCompleted'
 * @memberof QuotientBankForm
 * @returns React.FC Form Field
 */
const FormFieldGovId = ({ control, isSelfieCaptureCompleted, setIsCaptureCompleted, isDocumentCaptureComplete, setIsUploadPoDComplete }) => (
    <>
        <WebCamPhoto
            control={control}
            isCaptureCompleted={isSelfieCaptureCompleted}
            setIsCaptureCompleted={setIsCaptureCompleted}
            gif="/daon-liveness-check.gif"
            capturedImage="/example_webcam.png"
            placeholder="/background_replace.png"
            buttonTxt="Take Photo" />

        <WebCamPassport
            control={control}
            setIsCaptureCompleted={setIsUploadPoDComplete}
            isCaptureCompleted={isDocumentCaptureComplete}
            gif="/daon-document-check.gif"
            capturedImage="/example_passport.png"
            placeholder="/upload_file.png"
            buttonTxt="Upload Government Issued ID" />
    </>
);

export default FormFieldGovId;
