import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from 'components/ui/button';
import { PROOFT_TEMPLATES_IDS } from 'utils/constants';
import QrCodeAuthentication from 'components/qrcode/qr-auth';
import qrCodeVerificationData from 'data/qrcode-text-data';
import useQrCode from 'hooks/useQrCode';
import qrCodeStore from 'store/qrCodeStore';
import { Separator } from '../../ui/separator';

/**
 * @description Urbanscape Success for approved application for appartment.
 * @memberof UrbanScapePage
 * @returns React.FC 
 */
const UrbanscapeSuccess = () => {
    const proofTemplateId = PROOFT_TEMPLATES_IDS.URBANSCAPE_CREDITSCORE;
    const { refetch } = useQrCode({ proofTemplateId });
    const retrievedData = qrCodeStore((state) => state.retrievedData);
    const verified = qrCodeStore((state) => state.verified);

    useEffect(() => {
        setTimeout(() => {
            refetch();
        }, 1000);
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (verified === true && retrievedData !== null) {
            setTimeout(() => {
                const credential = retrievedData.credentials[0];
                if (credential) {
                    console.log('CREDIT SCORE CREDENTIAL: ', credential);
                }
            }, 1000);
        }
        // eslint-disable-next-line
    }, [verified, retrievedData]);

    return (
        <div>
            <div className='my-4'>
                <h2 className='text-4xl text-urban font-semibold'>You have been approved!</h2>
                <p className='font-semibold text-base'>To reserve your new appartment home, please pay total amount due now.</p>
            </div>
            <div className='flex gap-4 flex-wrap'>
                <div className='flex-1 w-full xl:w-2/3 md:w-2/3 space-y-5'>
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
                        <Link href='/partners' target='_blank'>
                            <a target='_blank' rel='noopener noreferrer'>
                                <div className='w-2/4 cursor-pointer mt-5 mb-5'>
                                    <Image src={'/clarity_partners.png'} alt='clarity_partners' width={230} height={36} />
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='flex-2 w-full md:w-1/3 xl:w-1/3'>
                    <QrCodeAuthentication
                        required={true}
                        onlyCreditScore={true}
                        proofTemplateId={proofTemplateId}
                        title={qrCodeVerificationData.URBAN_CREDITSCORE.title}
                        qrText={qrCodeVerificationData.URBAN_CREDITSCORE.qrText}
                        qrTextAfter={qrCodeVerificationData.URBAN_CREDITSCORE.qrTextAfter}
                    />
                </div>
            </div>
        </div>
    );
};

export default UrbanscapeSuccess;
