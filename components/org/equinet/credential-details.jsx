import React, { useState } from 'react';
import { useRevoke } from 'hooks/useRevoke';
import { Loader2, Check, ShieldX } from 'lucide-react';
import { Button } from 'components/ui/button';

/**
 * @description Equinet Credentials comp
 * @param {*} setData push a new object to data
 * @memberof EquinetPage
 * @returns React.FC 
 */
const CredentialDetails = ({ setData }) => {
    const [credentials, setCredentials] = useState([
        {
            title: 'Credit Score of 706',
            description: 'EquiNET',
            status: 'Out of Date'
        },
        {
            title: 'Credit Score of 625',
            description: 'EquiNET',
            status: 'Good'
        },
    ]);

    const {
        loadingRevokation,
        handleRevoke
    } = useRevoke();

    function formatDate() {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    }

    async function handleAnim() {
        setTimeout(() => {
            setData((oldData) => [...oldData,
            {
                action: 'Credit Score of 625',
                status: 'Revoked',
                date: formatDate()
            },
            {
                action: 'Credit Score of 615',
                status: 'Good',
                date: formatDate()
            }]);
            setCredentials(() => [
                {
                    title: 'Credit Score of 706',
                    description: 'EquiNET',
                    status: 'Out of Date'
                },
                {
                    title: 'Credit Score of 625',
                    description: 'EquiNET',
                    status: 'Revoked'
                },
                {
                    title: 'Credit Score of 615',
                    description: 'EquiNET',
                    status: 'Good'
                },
            ]);
        }, 1000);
    }

    const onRevokeCredential = async () => {
        await handleRevoke();
        await handleAnim();
    };

    return (
        <div className='space-y-4 pt-2'>
            <h2 className='font-semibold text-lg'>Credential Details</h2>
            <div className='grid gap-2 justify-items-center'>
                {credentials.map((value, index) => (
                    <div key={index} className='h-fit flex items-center justify-between p-4 border rounded-2xl mt-4 shadow-lg bg-white w-full'>
                        <div>
                            <h2 className='font-bold'>{value.title}</h2>

                            <p className='text-sm'>{value.description}</p>
                        </div>
                        {value.status === 'Good' ? (<Check className="text-green-600 h-6 w-6" />) : (<ShieldX className="text-red-600 h-6 w-6" />)}
                    </div>
                ))}
            </div>
            <Button disabled={loadingRevokation} onClick={onRevokeCredential} className={`rounded-full ${loadingRevokation ? 'bg-purple-400' : 'bg-purple-600'}`}>

                <>

                    {loadingRevokation ? (
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
