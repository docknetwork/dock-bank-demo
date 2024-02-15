import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QrCodeAuthentication from 'components/qrcode/qr-auth';
import qrCodeVerificationData from 'data/qrcode-text-data';
import useQrCode from 'hooks/useQrCode';
import { Separator } from '../../ui/separator';

const textFields = {
    thanks: 'Thank you for trusting Quotient with your auto loan needs. We are thankful for you.',
    description: 'Quotient is a part of the IdentityClarity\'s ecosystem called clarity partners.',
    benefits: `As a part customer of our Credit Union you are able to receive valuable benefits from all ecosystem partners.
    Utilizing verified information about you we can issue you credentials that you can use at each ecosystem partner to quickly share your data in a secure and private way.`,
    instructions: 'Scan the QR code on the right to get started.'
};

/**
 * @description Quotient Success for open a new account.
 * @param {*} title title for comp
 * @memberof QuotientBankForm, QuotientApplyLoanForm
 * @returns React.FC Form Field
 */
const QuotientSuccess = ({ title, proofTemplateId }) => {
    const { refetch } = useQrCode({ proofTemplateId });

    useEffect(() => {
        refetch();
    }, [proofTemplateId, refetch]);

    return (
        <div className='mainContainer'>
            <div className='pt-10 p-5'>
                <h2 className='text-3xl font-semibold mb-5'>{title}</h2>
                <div className='flex gap-4'>
                    <div className='p-4 bg-neutral-50 rounded-lg h-fit flex-1 w-60'>
                        <p className='font-semibold leading-loose'>{textFields.thanks}</p>
                        <p className='font-semibold leading-loose'>{textFields.description}</p>
                        <Link href='/partners'>
                            <div className='w-2/4 cursor-pointer mt-5 mb-5'>
                                <Image src={'/clarity_partners.png'} alt='clarity_partners' width={230} height={36} />
                            </div>
                        </Link>
                        <Separator />
                        <p className='text-justify font-semibold leading-loose mt-5'>
                            {textFields.benefits}
                        </p>
                        <p className='font-semibold leading-loose'>{textFields.instructions}</p>
                    </div>
                    <div className='bg-neutral-50 rounded-lg flex-2 w-30'>

                        <QrCodeAuthentication
                            proofTemplateId={proofTemplateId}
                            title={qrCodeVerificationData.BANK.title}
                            qrText={qrCodeVerificationData.BANK.qrText}
                            qrTextAfter={qrCodeVerificationData.BANK.qrTextAfter}
                        />
                    </div>
                </div>
            </div>
        </div>);
};

export default QuotientSuccess;
