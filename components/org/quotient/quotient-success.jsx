import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QrCodeAuthentication from 'components/qrcode/qr-auth';
import qrCodeVerificationData from 'data/qrcode-text-data';
import useQrCode from 'hooks/useQrCode';
import { Separator } from '../../ui/separator';

const textFields = {
    thanks: 'Thank you for trusting Quotient with your financial needs. We are thankful for you. Quotient is a part of IdentityClarity\'s partner ecosystem called Clarity Partners.',
    benefits: 'As a customer of Quotient Credit Union, you are able to receive valuable benefits from other Clarity Partners by using verified information stored in Quotient\'s mobile banking app. Using your mobile banking app to share data with a Clarity Partner is quick, secure, and private.',
    instructions: 'Scan the QR code on the right to get started.'
};

/**
 * @description Quotient Success for open a new account.
 * @param {*} title title for comp
 * @memberof QuotientBankForm, QuotientApplyLoanForm
 * @returns React.FC Form Field
 */
const QuotientSuccess = ({ title, proofTemplateId, showQrcode = true }) => {
    const { refetch } = useQrCode({ proofTemplateId });

    useEffect(() => {
        refetch();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    return (
        <div className='mainContainer'>
            <div className='pt-10 p-5'>
                <h2 className='w-full text-3xl font-semibold mb-5'>{title}</h2>
                <div className='flex gap-4 flex-wrap'>
                    <div className='flex-1 w-full xl:w-2/3 md:w-2/3 p-4 bg-neutral-50 rounded-lg h-fit'>
                        <p className='font-semibold leading-loose'>{textFields.thanks}</p>
                        <Link href='/partners' target='_blank'>
                            <a target='_blank' rel='noopener noreferrer'>
                                <div className='w-2/4 cursor-pointer mt-5 mb-5'>
                                    <Image src={'/clarity_partners.png'} alt='clarity_partners' width={230} height={36} />
                                </div>
                            </a>
                        </Link>
                        <Separator />
                        <p className='text-justify font-semibold leading-loose mt-5'>
                            {textFields.benefits}
                        </p>
                        <p className='text-justify font-semibold leading-loose mt-5'>
                            Download the Quotient Mobile App by clicking <Link href='https://play.google.com/store/apps/details?id=com.dockapp&hl=en_US'>
                                <a className='text-blue-600' target='_blank' rel='noopener noreferrer'>
                                    this link
                                </a>
                            </Link>
                        </p>
                        <p className='font-semibold leading-loose'>{textFields.instructions}</p>
                    </div>
                    {showQrcode &&
                        <div className='flex-2 w-full md:w-1/3 xl:w-1/3 bg-neutral-50 rounded-lg'>

                            <QrCodeAuthentication
                                required={false}
                                proofTemplateId={proofTemplateId}
                                title={qrCodeVerificationData.BANK.title}
                                qrText={qrCodeVerificationData.BANK.qrText}
                                qrTextAfter={qrCodeVerificationData.BANK.qrTextAfter}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>);
};

export default QuotientSuccess;
