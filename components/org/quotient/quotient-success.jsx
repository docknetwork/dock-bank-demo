import React from 'react';
import Image from 'next/image';
import { Separator } from '../../ui/separator';
import BankCredentials from './bank-credentials';

const textFields = {
    thanks: 'Thank you for trusting Quotient with your auto loan needs. We are thankful for you.',
    description: 'Quotient is a part of the IdentityClarity\'s ecosystem called clarity partners.',
    benefits: `As a part customer of our Credit Union you are able to receive valuable benefits from all ecosystem partners.
    Utilizing verified information about you we can issue you credentials that you can use at each ecosystem partner to quickly share your data in a secure and private way.`,
    instructions: 'Scan the QR code on the right to get started.'
};

const qrInstructions = {
    stepOne: 'Scan this QR code with your mobile bank app to log in the app and receive these benefits.',
    stepTwo: 'You will be required to provide a biometric on your mobile device in order to receive these credentials.'
};

/**
 * @description Quotient Success for open a new account.
 * @param {*} title title for comp
 * @memberof QuotientBankForm, QuotientApplyLoanForm
 * @returns React.FC Form Field
 */
const QuotientSuccess = ({ title }) => (
    <>
        <div className='pt-10 p-5'>
            <h2 className='text-2xl font-semibold mb-5'>{title}</h2>
            <div className='grid md:grid-cols-2 gap-2'>
                <div className='p-4 grid gap-4 bg-neutral-50 rounded-lg h-fit'>
                    <p>{textFields.thanks}</p>
                    <p>{textFields.description}</p>
                    <div className='w-2/4'>
                        <Image src={'/clarity_partners.png'} alt='clarity_partners' width={200} height={30} />
                    </div>
                    <Separator />
                    <p className='text-justify'>
                        {textFields.benefits}
                    </p>
                    <p>{textFields.instructions}</p>
                </div>
                <div className='p-4 grid gap-4 bg-neutral-50 rounded-lg'>
                    <p className='text-justify'>{qrInstructions.stepOne}</p>
                    <div className='justify-self-center'>QR CODE HERE</div>
                    <p className='text-justify'>{qrInstructions.stepTwo}</p>
                    <BankCredentials />
                </div>
            </div>
        </div>

    </>
);

export default QuotientSuccess;
