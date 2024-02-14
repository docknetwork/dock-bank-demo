import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateQR } from 'utils/generate-qr';
import { CheckCircle2 } from 'lucide-react';
import { Button } from 'components/ui/button';
import { QRCodeGenerator } from 'components/qr-generator';
import { Separator } from '../../ui/separator';
import { PROOFT_TEMPLATES_IDS } from 'utils/constants';
/**
 * @description Urbanscape Success for approved application for appartment.
 * @memberof UrbanScapePage
 * @returns React.FC 
 */
const UrbanscapeSuccess = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const proofTemplateID = PROOFT_TEMPLATES_IDS.URBANSCAPE_CREDITSCORE;

    const handleGenerateQR = async () => {
        const response = await generateQR(proofTemplateID);
        console.log('handleGenerateQR', { response });
        setQrCodeUrl(response.qr);
    };

    useEffect(() => {
        if (qrCodeUrl === '') handleGenerateQR();
    }, [qrCodeUrl]);

    return (
        <div>
            <div className='my-4'>
                <h2 className='text-4xl text-urban font-semibold'>You have been approved!</h2>
                <p className='font-semibold text-base'>To reserve your new appartment home, please pay total amount due now.</p>
            </div>
            <div className='grid md:grid-cols-3 gap-2'>
                <div className='col-span-2 space-y-4'>
                    <div className='border rounded-lg'>
                        <div className='border-b p-3 flex items-center justify-between'>
                            <p className='font-bold'>2 bedroom 2 bath with city view</p>
                            <CheckCircle2 className='text-white bg-urban rounded-full' />
                        </div>
                        <div className='p-3'>
                            <div className='flex space-x-1 items-center'>
                                <h2 className='text-2xl font-bold'>$2,550</h2>
                                <p className='text-sm'>per month</p>
                            </div>
                            <p className='text-sm'>Includes use of all common area, pool, gym and parks.</p>
                        </div>
                    </div>
                    <div className='border rounded-lg'>
                        <div className='border-b p-3 flex items-center justify-between'>
                            <p className='font-bold'>Deposit</p>
                            <CheckCircle2 className='text-white bg-urban rounded-full' />
                        </div>
                        <div className='p-3 space-y-2'>
                            <div className='flex space-x-1 items-center'>
                                <h2 className='text-2xl font-bold'>$1,440</h2>
                                <p className='text-sm'>one time</p>
                            </div>
                            <p className='text-sm'>We have a special offer for our applicants that have good credit. Provide to us a verified credential with a credit score over 700 and get your deposit waived!</p>
                            <p className='text-sm'>This is a $1,440.00 value.</p>
                            <p className='font-bold text-green'>Scan the QR code on the right with your mobile app to see if you qualify.</p>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <p className='font-bold'>TOTAL DUE NOW:</p>
                        <p className='text-3xl font-semibold text-green'>$3,990</p>
                        <Button className='bg-cyan-700 text-sm p-6 px-6 font-semibold'>Pay Now</Button>
                    </div>
                    <Separator />
                    <div className='space-y-4'>
                        <p>{'Urbanscape is a part of the IdentityClarity\'s ecosystem called clarity partners.'}</p>
                        <div>
                            <Image src={'/partners.png'} alt='clarity_partners' width={230} height={36} />
                        </div>
                    </div>
                </div>
                <div className='h-fit p-4 bg-neutral-50 rounded-lg space-y-5'>
                    <p className='font-bold text-xl'>Scan QR code with your mobile app to see if you qualify for a waived deposit.</p>
                    {qrCodeUrl !== '' ? (<QRCodeGenerator url={qrCodeUrl} />) : null}
                </div>
            </div>
        </div>
    );
};

export default UrbanscapeSuccess;
