import OrganizationCard from 'components/org/organizationCard';
import organizations from 'data/organizations';
import Image from 'next/image';
import React from 'react';

export default function Home() {

    console.log(organizations)

    return (
        <>
            <div className='flex p-5'>
                <div className='mr-5'>
                    <Image
                        src="/docklogo.png"
                        width={84}
                        height={32}
                    />
                </div>
                <div>
                    <h1 className='Header'>

                        <span className='mr-2'>|</span> Sales Demo</h1>
                </div>
            </div>
            <div className='container m-auto p-10'>
                <h1 className='title'>Organizations</h1>

                <div className='pt-20 grid grid-cols-5 gap-4'>
                    {
                        organizations.map((org) => {
                            return <OrganizationCard org={org} />
                        })
                    }

                </div>

            </div>
        </>
    );
}
