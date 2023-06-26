import React from 'react';
import { useRouter } from 'next/router';

import PageLayout from 'components/page-layout';
import PageTitle from 'components/page-title';

export default function Home() {
  const router = useRouter();

  return (
    <PageLayout>
      <PageTitle>Dock Bank</PageTitle>
      <button
        type="button"
        onClick={() => router.push('/dashboard')}
        className="block px-4 py-2 mt-5 mb-2 font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:-translate-y-1 duration-250"
      >
        Dashboard
      </button>
    </PageLayout>
  );
}
