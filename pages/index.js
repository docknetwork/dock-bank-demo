import OrganizationCard from 'components/org/organizationCard';
import organizations from 'data/organizations';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Separator } from 'components/ui/separator';
import DemoFlow from 'components/demo-flow';
import { Button } from 'components/ui/button';

export default function Home() {
  return (
    <>
      <div className="p-10 m-auto text-center cardsContainer">
        <div className="flex">
          <div className="mr-5">
            <Image alt="truveralogo" src="/truveralogoblack.png" width={144} height={32} />
          </div>
          <div>
            <h1 className="Header">
              <span className="mr-2">|</span> Sales Demo
            </h1>
          </div>
        </div>
        <div className="grid gap-4 pt-5 text-center xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1">
          {organizations.map((org, i) => (
            <div key={`card${i}`}>
              <div key={i} className="orgCard">
                <OrganizationCard key={i} org={org} />
              </div>
              {org.name === 'Quotient' && (
                <div className="mt-2">
                  <Link href="/wallet">
                    <Button className="w-full pt-6 pb-6 font-bold rounded-full" variant="outline">
                      <a className="text-blue-600" target="_blank" rel="noopener noreferrer">
                        Download the
                        <br />
                        Quotient Mobile App
                      </a>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 mb-10">
          <Separator />
        </div>
        <DemoFlow />
        <div className="m-auto mt-5">
          <Link href="/org/quotient">
            <button className="launchBtn">Launch Demo</button>
          </Link>
        </div>
      </div>
    </>
  );
}
