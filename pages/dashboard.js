import React from 'react';
import Link from 'next/link';

import PageLayout from 'components/page-layout';
import BankingAccountSummary from 'components/banking-account-summary';

const sections = [
  {
    title: 'Credit Card',
    link: '/credit-card',
    disabled: false,
    target: '_self',
  },
  {
    title: 'Rewards Program',
    link: '/rewards-program',
    disabled: false,
    target: '_blank',
  },
  {
    title: 'Customer Service',
    link: '/customer-service',
    disabled: false,
    target: '_self',
  },
];

const Dashboard = () => (
  <PageLayout title="Dashboard">
    <div className="px-3 py-5 md:lg:xl:px-10 bg-opacity-10">
      <BankingAccountSummary />
      <div className="grid grid-cols-1 bg-white border rounded-lg shadow-xl md:grid-cols-3 group">
        {sections.map((section) => (
          <div key={section.link}>
            <Link href={section.link} passHref>
              <a
                aria-label={section.title}
                target={section.target || '_self'}
                className="flex flex-col items-center p-10 text-center cursor-pointer group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50">
                <span className="mt-3 text-xl font-medium text-slate-700">{section.title}</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default Dashboard;
