import React from 'react';
import { Check } from 'lucide-react';
import qrCodeStore from 'store/qrCodeStore';

const credentials = {
    biometric: {
        title: 'Biometric Check',
        description: 'ForSur'
    },
    loan: {
        title: 'Bank Customer Identity',
        description: 'Quotient Credit Union'
    },
    credit: {
        title: 'Credit Score',
        description: 'Equinet'
    },
};

const CredentialCards = ({ onlyCreditScore = false, required = false }) => {
    const verified = qrCodeStore((state) => state.verified);

    return (
        <>
            <div className='mb-5'>
                <h3 className='font-bold'>{!required ? 'Offered credentials:' : 'Required credentials:'}</h3>
            </div>
            <div className='grid gap-4 place-items-center'>

                {
                    onlyCreditScore ?
                        <div className='flex items-center justify-between p-4 border rounded-2xl shadow-lg bg-white w-full'>
                            <div>
                                <h2 className='font-bold'>{credentials.credit.title}</h2>
                                <p className='text-sm font-medium'>{credentials.credit.description}</p>
                            </div>
                            {verified && <Check className='text-green-600 h-6 w-6' />}
                        </div>
                        :
                        Object.entries(credentials).map(([key, value], index) => (
                            <div key={index} className='flex items-center justify-between p-4 border rounded-2xl shadow-lg bg-white w-full'>
                                <div>
                                    <h2 className='font-bold'>{value.title}</h2>
                                    <p className='text-sm font-medium'>{value.description}</p>
                                </div>
                                {verified && <Check className='text-green-600 h-6 w-6' />}
                            </div>
                        ))
                }
            </div>
        </>
    );
};

export default CredentialCards;
