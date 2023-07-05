import React from 'react';
import { useRouter } from 'next/router';

import PageLayout from 'components/page-layout';

const sections = [
  {
    title: 'Credit Card',
    link: '/credit-card',
    disabled: false,
  },
  {
    title: 'Rewards Program',
    link: '/rewards-program',
    disabled: false,
  },
  {
    title: 'Customer Service',
    link: '/customer-service',
    disabled: false,
  },
];

const Dashboard = () => {
  const router = useRouter();

  return (
    <PageLayout title="Dashboard">
      <div className="px-3 py-5 md:lg:xl:px-10 bg-opacity-10">
        <div className="grid grid-cols-1 bg-white border rounded-lg shadow-xl md:grid-cols-3 group">
          {sections.map((section) => (
            <div
              key={section.link}
              onClick={() => !section.disabled && router.push(section.link)}
              className="flex flex-col items-center p-10 text-center cursor-pointer group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50">
              <p className="mt-3 text-xl font-medium text-slate-700">{section.title}</p>
              {section.description && (
                <p className="mt-2 text-sm text-slate-500">{section.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
