import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateQR } from 'utils/generate-qr';
import { CheckSquare2 } from 'lucide-react';
import { Button } from 'components/ui/button';
import { QRCodeGenerator } from 'components/qr-generator';
import { Separator } from '../../ui/separator';

/**
 * @description Urbanscape Success for approved application for appartment.
 * @memberof UrbanScapePage
 * @returns React.FC 
 */
const UrbanscapeSuccess = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const proofTemplateID = 'b156507a-949f-4dff-ab2f-ba98ea840678';

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
                <h2 className='text-2xl font-semibold'>You have been approved!</h2>
                <p>To reserve your new appartment home, please pay total amount due now.</p>
            </div>
            <div className='grid md:grid-cols-3 gap-2'>
                <div className='col-span-2 space-y-4'>
                    <div className='border rounded-lg'>
                        <div className='border-b p-2 flex items-center justify-between'>
                            <p className='font-bold'>2 bedroom 2 bath with city view</p>
                            <CheckSquare2 />
                        </div>
                        <div className='p-2'>
                            <div className='flex space-x-1 items-center'>
                                <h2 className='text-2xl font-bold'>$2,550</h2>
                                <p className='text-sm'>per month</p>
                            </div>
                            <p className='text-sm'>Includes use of all common area, pool, gym and parks.</p>
                        </div>
                    </div>
                    <div className='border rounded-lg'>
                        <div className='border-b p-2 flex items-center justify-between'>
                            <p className='font-bold'>Deposit</p>
                            <CheckSquare2 />
                        </div>
                        <div className='p-2 space-y-2'>
                            <div className='flex space-x-1 items-center'>
                                <h2 className='text-2xl font-bold'>$1,440</h2>
                                <p className='text-sm'>one time</p>
                            </div>
                            <p className='text-sm'>We have a special offer for our applicants that have good credit. Provide to us a verified credential with a credit score over 700 and get your deposit waived!</p>
                            <p className='text-sm'>This is a $1,440.00 value.</p>
                            <p className='font-bold text-green-600'>Scan the QR code on the right with your mobile app to see if you qualify.</p>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <p className='font-semibold'>TOTAL DUE NOW:</p>
                        <p className='text-2xl font-semibold text-green-600'>$3,990</p>
                        <Button className='bg-cyan-800'>Pay Now</Button>
                    </div>
                    <Separator />
                    <div className='space-y-4'>
                        <p>{'Urbanscape is a part of the IdentityClarity\'s ecosystem called clarity partners.'}</p>
                        <div><Image src={'/partners.png'} alt='clarity_partners' width={200} height={30} />
                        </div>
                    </div>
                </div>
                <div className='h-fit p-4 bg-neutral-50 rounded-lg space-y-5'>
                    <p className='font-bold text-2xl'>Scan QR code with your mobile app to see if you qualify for a waived deposit.</p>
                    {qrCodeUrl !== '' ? (<QRCodeGenerator url={qrCodeUrl} />) : null}
                </div>
            </div>
        </div>
    );
};

export default UrbanscapeSuccess;
