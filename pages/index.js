import OrganizationCard from 'components/org/organizationCard';
import organizations from 'data/organizations';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Separator } from 'components/ui/separator';
import DemoFlow from 'components/demo-flow';

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
        <div className="pt-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1 gap-4 text-center">
          {organizations.map((org, i) => (
            <div key={i} className="orgCard">
              <OrganizationCard key={i} org={org} />
            </div>
          ))}
        </div>
        <div className="mt-10 mb-10">
          <Separator />
        </div>
        <DemoFlow />
        <div className="mt-5 m-auto">
          <Link href="/org/quotient">
            <button className="launchBtn">Launch Demo</button>
          </Link>
        </div>
      </div>
    </>
  );
}
