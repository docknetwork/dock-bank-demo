import OrganizationCard from 'components/org/organizationCard';
import organizations from 'data/organizations';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import PageLayout from 'components/page-layout';

export default function Home() {
  return (
    <>
      <PageLayout>
        <div className="cardsContainer m-auto p-10 text-center">
          <div className="flex">
            <div className="mr-5">
              <Image alt="docklogo" src="/docklogo.png" width={84} height={32} />
            </div>
            <div>
              <h1 className="Header">
                <span className="mr-2">|</span> Sales Demo
              </h1>
            </div>
          </div>
          <div className="text-left mt-5">
            <h1 className="title">Organizations</h1>
          </div>
          <div className="pt-5 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1 gap-4">
            {organizations.map((org, i) => (
              <div key={i} className="orgCard">
                <OrganizationCard key={i} org={org} />
              </div>
            ))}
          </div>
          <button className="launchBtn" onClick={() => toast.info('hello')}>
            Launch Demo
          </button>
        </div>
      </PageLayout>
    </>
  );
}
