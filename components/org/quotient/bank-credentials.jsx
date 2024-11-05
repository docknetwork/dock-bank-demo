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

const CredentialCards = ({ onlyCreditScore = false, required = false, filteredCredentials }) => {
    const verified = qrCodeStore((state) => state.verified);
    const filteredCredentialsEntries = filteredCredentials ?
        Object.entries(credentials).filter(([key]) => filteredCredentials.includes(key)) :
        Object.entries(credentials);

    return (
        <>
            <div className='mb-5'>
                <h3 className='font-bold'>{!required ? 'Offered credentials:' : 'Required credentials:'}</h3>
            </div>
            <div className='grid gap-4 place-items-center'>

                {
                    onlyCreditScore ?
                        <div className='flex items-center justify-between w-full p-4 bg-white border shadow-lg rounded-2xl'>
                            <div>
                                <h2 className='font-bold'>{credentials.credit.title}</h2>
                                <p className='text-sm font-medium'>{credentials.credit.description}</p>
                            </div>
                            {verified && <Check className='w-6 h-6 text-green-600' />}
                        </div>
                        :
                        filteredCredentialsEntries.map(([key, value], index) => (
                            <div key={index} className='flex items-center justify-between w-full p-4 bg-white border shadow-lg rounded-2xl'>
                                <div>
                                    <h2 className='font-bold'>{value.title}</h2>
                                    <p className='text-sm font-medium'>{value.description}</p>
                                </div>
                                {verified && <Check className='w-6 h-6 text-green-600' />}
                            </div>
                        ))
                }
            </div>
        </>
    );
};

export default CredentialCards;
