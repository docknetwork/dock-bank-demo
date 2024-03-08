import React, { useState } from 'react';
import Head from 'next/head';
import { Sidebar } from 'components/org/equinet/sidebar';
import { Home, ChevronRight, Info, ChevronLeft } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import EquinetTable from 'components/org/equinet/dataTable';
import CredentialDetails from 'components/org/equinet/credential-details';
import { Separator } from 'components/ui/separator';

import Link from 'next/link';

/**
 * @description Equinet dashboard.
 * @todo refactor this page by making code more modular
 * @returns React.FC page
 */
const EquinetPage = () => {
    const [data, setData] = useState(
        [
            {
                action: '12 Months No Late Payments',
                status: 'Good',
                date: 'Jan 6, 2022'
            },
            {
                action: 'Credit Score of 706',
                status: 'Out of Date',
                date: 'Jan 6, 2022'
            },
            {
                action: '10+ Credit Accounts',
                status: 'Good',
                date: 'Jan 5, 2022'
            },
            {
                action: '12 Months Late Payments',
                status: 'Out of Date',
                date: 'Feb 13, 2022'
            }
        ]
    );

    return (
        <>
            <Head>
                <title>Equinet - Dashboard</title>
            </Head>
            <div className="grid lg:grid-cols-6 min-h-screen">
                <Sidebar className="hidden lg:block" />
                <div className="col-span-4 lg:col-span-5 lg:border-l">
                    <div className="h-full  py-6 lg:px-8 equinetContainer">
                        <div className='mb-5 cursor-pointer block lg:hidden'>
                            <Link href={'/'}>
                                <ChevronLeft className='text-black text-3xl' />
                            </Link>
                        </div>
                        <div className='grid grid-cols-1 gap-8 p-5'>
                            <div className='flex space-x-4'>
                                <span className='cursor-pointer'>
                                    <Link href="/">
                                        <Home />
                                    </Link>
                                </span>
                                <ChevronRight />
                                <p>Dashboard</p>
                                <ChevronRight />
                                <p className='font-bold'>Users</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex space-x-2 items-center w-fit'>
                                    <h2 className='text-2xl font-semibold'>Users | Euan Miller</h2>
                                    <Info />
                                </div>
                                <Button variant='secondary' className='rounded-full'>Import</Button>
                            </div>
                            <Tabs defaultValue="credentials" className="w-full">
                                <TabsList className="xl:w-[400px] bg-transaparent flex flex-wrap">
                                    <TabsTrigger className="flex-1 text-slate-500 font-bold" value="overview" >Overview</TabsTrigger>
                                    <TabsTrigger className="flex-1 text-slate-500 font-bold" value="accounts" >Accounts</TabsTrigger>
                                    <TabsTrigger className="flex-1 text-blue-400 font-bold" value="credentials">Credentials</TabsTrigger>
                                    <TabsTrigger className="flex-1 text-slate-500 font-bold" value="settings">Settings</TabsTrigger>
                                </TabsList>
                                <Separator />
                                <TabsContent value="credentials">
                                    <div className='flex gap-4 flex-wrap pt-6'>
                                        <div className='flex-1 w-full xl:w-1/2 md:w-1/2 p-4 space-y-5'>
                                            <EquinetTable data={data} />
                                        </div>
                                        <div className='flex-2 w-full md:w-1/2 xl:w-1/2'>
                                            <CredentialDetails setData={setData} />
                                        </div>
                                    </div>
                                </TabsContent>

                            </Tabs>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default EquinetPage;
