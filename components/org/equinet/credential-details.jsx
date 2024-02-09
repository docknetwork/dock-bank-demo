import React from 'react';
import { toast } from 'sonner';
import { Loader2, Check, ShieldX } from 'lucide-react';
import Button from 'components/button';

const credentials = {
    biometric: {
        title: 'Credit Score of 706',
        description: 'EquiNET',
        status: 'Out of Date'
    },
    loan: {
        title: 'Credit Score of 625',
        description: 'EquiNET',
        status: 'Good'
    },
};

/**
 * @description Equinet Credentials comp
 * @param {*} isLoading revoke/issuing credential loading status
 * @param {*} setIsLoading trigger loading modal when revoke/issuing credential
 * @memberof EquinetPage
 * @returns React.FC 
 */
const CredentialDetails = ({ isLoading, setIsLoading }) => {
    const onRevokeCredential = () => {
        toast.info('will revoke and issue new credential');
        setIsLoading(true);
    };
    return (
        <div className='space-y-4'>
            <h2 className='font-semibold text-lg'>Credential Details</h2>
            <div className='grid gap-2 justify-items-center'>
                {Object.entries(credentials).map(([key, value], index) => (
                    <div key={index} className='h-fit flex items-center justify-between p-4 border rounded-lg shadow-lg bg-white w-full lg:w-3/4'>
                        <div>
                            <h2 className='font-bold'>{value.title}</h2>

                            <p className='text-sm'>{value.description}</p>
                        </div>
                        {value.status === 'Good' ? (<Check className="text-green-600 h-6 w-6" />) : (<ShieldX className="text-red-600 h-6 w-6" />)}
                    </div>
                ))}
            </div>
            <Button disabled={isLoading} onClick={onRevokeCredential} className={`rounded-full ${isLoading ? 'bg-purple-400' : 'bg-purple-600'}`}>

                <>

                    {isLoading ? (
                        <div className='flex items-center'>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </div>
                    ) : (
                        <>
                            Revoke and Issue New Credential
                        </>)}</>
            </Button>

        </div>
    );
};

export default CredentialDetails;
