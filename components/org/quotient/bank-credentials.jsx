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
const BankCredentials = ({ isAuth = false }) => (
    <div className='grid gap-4 place-items-center'>
        {Object.entries(credentials).map(([key, value], index) => (
            <div key={index} className='flex items-center justify-between p-4 border rounded-2xl shadow-lg bg-white w-full max-w-80'>
                <div>
                    <h2 className='font-bold'>{value.title}</h2>
                    <p className='text-sm font-medium'>{value.description}</p>
                </div>
                {isAuth && <Check className="text-green-600 h-6 w-6" />}
            </div>
        ))}
    </div>
);

export default BankCredentials;
