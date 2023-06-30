import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import CameraIcon from 'components/icons/camera';
import UserCircleIcon from 'components/icons/user-circle';
import CensoredTextIcon from 'components/icons/censored-text';
import KYCPassed from 'components/kyc-passed';
import CustomerInfoForm from 'components/customer-info-form';
import PageLayout from 'components/page-layout';
import Button from 'components/button';

import { useLocalStorage } from 'utils/hooks';
import { SERVER_URL } from 'utils/constants';

const OnboardingForm = ({ handleFormSubmit }) => (
    <CustomerInfoForm
      title="New Customer Onboard"
      handleFormSubmit={handleFormSubmit}
    >
      <p className="mb-2">Upload document for KYC check</p>
      <div className="flex items-center gap-4 px-3 py-2 mb-8 border-2 rounded">
        <UserCircleIcon width={60} height={60} />
        <CensoredTextIcon />
      </div>
      <p className="mb-2">Take photo for KYC check</p>
      <div className="flex items-center justify-center p-6 mb-8 border-2 rounded">
        <CameraIcon width={24} height={24} />
      </div>
    </CustomerInfoForm>
);

const OnboardingSuccess = ({ handleSubmit }) => (
    <div className="mx-auto w-fit">
      <h2 className="mb-6 text-gray-800 text-l">Congrats! Your account has been created and your credentials are now accessible in your Wallet App </h2>
      <KYCPassed />
      <Button
        type="button"
        onClick={handleSubmit}
        className="block w-full"
      >
        Submit
      </Button>
    </div>
  );

export default function Onboarding() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [holderDID] = useLocalStorage('holderDID', process.env.NEXT_PUBLIC_HOLDER_DID);
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${SERVER_URL}/api/issue`, {}, {
        params: {
          holderDID
        }
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnboardingSuccessSubmit = async (event) => {
    event.preventDefault();

    router.push('/dashboard');
  };

  return (
    <PageLayout title="Dock Bank - Onboarding">
      <div className="w-full px-8 md:px-32 lg:px-24">
        {!isSubmitted && (
          <OnboardingForm handleFormSubmit={handleFormSubmit} />
        )}
        {isSubmitted && (
          <OnboardingSuccess
            handleSubmit={handleOnboardingSuccessSubmit}
          />
        )}
      </div>
    </PageLayout>
  );
}
