import Image from 'next/image';
import React from 'react';
import PageLayout from 'components/page-layout';
import Link from 'next/link';
import PartnersHeader from './partners/partners-header';
import PartnerCard from './partners/partner-card';
import partners from 'data/partners';

export default function Partners() {
    return (
        <>
            <PageLayout>
                <PartnersHeader />
                <div className='p-10 max-w-screen-xl m-auto'>
                    <div className='mb-5'>
                        <h3 className='text-purple text-2xl font-semibold'>Our Partners</h3>
                    </div>
                    <div className="pt-5 grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1 m-auto">
                        {partners.map((partner, i) => (
                            <div key={i}>
                                <PartnerCard key={i} partner={partner} />
                            </div>
                        ))}
                    </div>
                </div>

            </PageLayout>
        </>
    );
}
