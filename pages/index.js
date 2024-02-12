import OrganizationCard from 'components/org/organizationCard';
import organizations from 'data/organizations';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import LandingDemo from 'components/landing-demo';

export default function Home() {
  return (
    <>
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
        <div className="pt-5 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1 gap-4">
          {organizations.map((org, i) => (
            <div key={i} className="orgCard">
              <OrganizationCard key={i} org={org} />
            </div>
          ))}
        </div>
        <LandingDemo />
        <div className='mt-5'>
          <Link href="/org/quotient">
            <button className="launchBtn">
              Launch Demo
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
