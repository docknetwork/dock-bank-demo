import React from 'react';
import PartnersHeader from './partners/partners-header';
import PartnerCard from './partners/partner-card';
import partners from 'data/partners';

export default function Partners() {
    return (
        <>
            <PartnersHeader />
            <div className='max-w-screen-xl m-auto'>
                <div className='mb-5 mt-10'>
                    <h3 className='text-purple text-2xl font-semibold'>Our Partners</h3>
                </div>
                <div className="pt-5 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1 m-auto">
                    {partners.map((partner, i) => (
                        <div key={i}>
                            <PartnerCard key={i} partner={partner} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
