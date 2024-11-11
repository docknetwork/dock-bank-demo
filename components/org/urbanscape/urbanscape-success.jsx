import React, { useState, useEffect } from 'react';
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
    const [isWaived, setIsWaived] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            refetch();
        }, 1000);
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (verified === true && retrievedData !== null) {
            const credential = retrievedData?.credentials[0];
            if (verified === true && credential?.type.includes('EquiNetCreditScore')) {
                setIsWaived(true);
            }
        }
        // eslint-disable-next-line
    }, [verified, retrievedData]);

    return (
        <div>
            <div className='my-4'>
                <h2 className='text-4xl font-semibold text-urban'>You have been approved!</h2>
                <p className='text-base font-semibold'>To reserve your new appartment home, please pay total amount due now.</p>
            </div>
            <div className='flex flex-wrap gap-4'>
                <div className='flex-1 w-full space-y-5 xl:w-2/3 md:w-2/3'>
                    <div className='border rounded-lg'>
                        <div className='flex items-center justify-between p-3 border-b'>
                            <p className='font-bold'>2 bedroom 2 bath with city view</p>
                            <CheckCircle2 className='text-white rounded-full bg-urban' />
                        </div>
                        <div className='p-3'>
                            <div className='flex items-center space-x-1'>
                                <h2 className='text-2xl font-bold'>$2,550</h2>
                                <p className='text-sm'>per month</p>
                            </div>
                            <p className='text-sm'>Includes use of all common area, pool, gym and parks.</p>
                        </div>
                    </div>
                    <div className='border rounded-lg'>
                        <div className='flex items-center justify-between p-3 border-b'>
                            <p className='font-bold'>Deposit</p>
                            <CheckCircle2 className='text-white rounded-full bg-urban' />
                        </div>
                        <div className='p-3 space-y-2'>
                            <div className='flex items-center space-x-1'>
                                <h2 className='text-2xl font-bold'>{isWaived ? '$0' : '$1,440' }</h2>
                                <p className='text-sm'>one time</p>
                            </div>
                            { isWaived ? 
                            (
                                <p className='font-bold text-green'>Congratulations! You have qualified to have the deposit waived!</p>
                            )
                            : (
                                <div>
                                    <p className='text-sm'>We have a special offer for our applicants that have good credit. Provide to us a verified credential with a credit score over 700 and get your deposit waived!</p>
                                    <p className='text-sm'>This is a $1,440.00 value.</p>
                                    <p className='font-bold text-green'>Scan the QR code on the right with your mobile app to see if you qualify.</p>
                                </div>
                             )
                            }
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <p className='font-bold'>TOTAL DUE NOW:</p>
                        <p className='text-3xl font-semibold text-green'>{isWaived ? ('$2,550') : ('$3,990')}</p>
                        <Button className='p-6 px-6 text-sm font-semibold bg-cyan-700'>Pay Now</Button>
                    </div>
                    <Separator />
                    <div className='space-y-4'>
                        <p>{'Urbanscape is a part of the IdentityClarity\'s ecosystem called clarity partners.'}</p>
                        <Link href='/partners' target='_blank'>
                            <a target='_blank' rel='noopener noreferrer'>
                                <div className='w-2/4 mt-5 mb-5 cursor-pointer'>
                                    <Image src={'/clarity_partners.png'} alt='clarity_partners' width={230} height={36} />
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
                { !isWaived ?
                    (
                        <div className='w-full flex-2 md:w-1/3 xl:w-1/3'>
                            <QrCodeAuthentication
                                required={true}
                                onlyCreditScore={true}
                                proofTemplateId={proofTemplateId}
                                title={qrCodeVerificationData.URBAN_CREDITSCORE.title}
                                qrText={qrCodeVerificationData.URBAN_CREDITSCORE.qrText}
                                qrTextAfter={qrCodeVerificationData.URBAN_CREDITSCORE.qrTextAfter}
                            />
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
};

export default UrbanscapeSuccess;
