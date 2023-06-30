import React from 'react';
import { useRouter } from 'next/router';

import Button from 'components/button';
import PageLayout from 'components/page-layout';
import PageTitle from 'components/page-title';

export default function Home() {
  const router = useRouter();

  return (
    <PageLayout>
      <PageTitle>Dock Bank</PageTitle>
      <Button
        type="button"
        onClick={() => router.push('/onboarding')}
      >
        Onboarding
      </Button>
      <Button
        type="button"
        onClick={() => router.push('/dashboard')}
      >
        Dashboard
      </Button>
    </PageLayout>
  );
}
