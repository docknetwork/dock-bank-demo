import React from 'react';
import { Check } from 'lucide-react';

const credentials = {
    biometric: {
        title: 'Biometric Check',
        description: 'Identity Clarity'
    },
    loan: {
        title: 'Loan Approval',
        description: 'Quotient Credit Union'
    },
    credit: {
        title: 'Credit Score',
        description: 'Equinet'
    },
};

/**
 * @description Quotient Credentials comp
 * @param checked show Checked icon on credentials
 * @memberof LoanQrAuthentication, QuotientAccountOpened
 * @returns React.FC 
 */
const BankCredentials = ({ checked = false }) => (
    <div className='grid gap-4 place-items-center'>
        {Object.entries(credentials).map(([key, value], index) => (
            <div key={index} className='flex items-center justify-between p-2 border rounded-lg shadow-lg bg-white w-3/4 md:w-1/2'>
                <div>
                    <h2 className='font-bold'>{value.title}</h2>
                    <p className='text-sm'>{value.description}</p>
                </div>
                {checked ? (<Check className="text-green-600 h-6 w-6" />) : (undefined)}
            </div>
        ))}
    </div>
);

export default BankCredentials;
