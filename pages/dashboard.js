import React from 'react';
import { useRouter } from 'next/router';

import PageLayout from 'components/page-layout';
import PageTitle from 'components/page-title';

const Dashboard = () => {
  const router = useRouter();

  return (
    <PageLayout>
      <PageTitle>Dashboard</PageTitle>
      <div className="w-full px-8 md:px-32 lg:px-24">
        <div className="grid grid-cols-2 gap-4 mx-auto w-fit">
          <div
            className="p-10 border-2 rounded w-[300px] flex items-center justify-center cursor-not-allowed"
          >
            Bank Account
          </div>
          <div
            className="p-10 border-2 rounded w-[300px] flex items-center justify-center cursor-pointer"
            onClick={() => router.push('/credit-card')}
          >
            Credit Card
          </div>
          <div
            className="p-10 border-2 rounded w-[300px] flex items-center justify-center cursor-pointer"
            onClick={() => router.push('/rewards-program')}
          >
            Rewards Program
          </div>
          <div
            className="p-10 border-2 rounded w-[300px] flex items-center justify-center cursor-pointer"
            onClick={() => router.push('/customer-service')}
          >
            Customer Service
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
