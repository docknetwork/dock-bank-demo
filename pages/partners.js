import React from 'react';
import partners from 'data/partners';
import PartnersHeader from '../components/partners/partners-header';
import PartnerCard from '../components/partners/partner-card';

export default function Partners() {
  return (
    <>
      <PartnersHeader />
      <div className="max-w-screen-xl p-5 xl:p-0 m-auto">
        <div className="mb-5 mt-10 ">
          <h3 className="text-purple text-2xl font-semibold text-center xl:text-left lg:text-left md:text-left">
            Our Partners
          </h3>
        </div>
        <div className="pt-5 grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 m-auto gap-4">
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
