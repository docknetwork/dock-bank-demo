import React, { useState } from 'react';
import Head from 'next/head';
import { Sidebar } from 'components/org/equinet/sidebar';
import { Home, ChevronRight, Info } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import EquinetTable from 'components/org/equinet/dataTable';
import CredentialDetails from 'components/org/equinet/credential-details';

/**
 * @description Equinet dashboard.
 * @todo refactor this page by making code more modular
 * @returns React.FC page
 */
const EquinetPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Head>
                <title>Equinet - Dashboard</title>
            </Head>
            <div className="grid lg:grid-cols-6 min-h-screen">
                <Sidebar className="hidden lg:block" />
                <div className="col-span-4 lg:col-span-5 lg:border-l">
                    <div className="h-full px-4 py-6 lg:px-8">
                        <div className='grid grid-cols-1 gap-8'>
                            <div className='flex space-x-4'>
                                <Home />
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
                                <TabsList className="w-[400px]">
                                    <TabsTrigger value="overview" disabled>Overview</TabsTrigger>
                                    <TabsTrigger value="accounts" disabled>Accounts</TabsTrigger>
                                    <TabsTrigger value="credentials">Credentials</TabsTrigger>
                                    <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
                                </TabsList>
                                <TabsContent value="credentials">
                                    <div className='grid gap-6 grid-cols-2'>
                                        <EquinetTable />
                                        <CredentialDetails isLoading={isLoading} setIsLoading={setIsLoading} />
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
