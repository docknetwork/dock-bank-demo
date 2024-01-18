import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import CameraIcon from 'components/icons/camera';
import UploadIcon from 'components/icons/upload';
import KYCPassed from 'components/kyc-passed';
import CustomerInfoForm from 'components/customer-info-form';
import PageLayout from 'components/page-layout';
import Button from 'components/button';

import { useLocalStorage } from 'utils/hooks';
import { SERVER_URL, BANK_NAME } from 'utils/constants';

const UploadKYCDocumentsInteractiveFormItem = () => {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <>
      <p className="mb-2">Upload document for KYC check</p>
      <div className="flex items-center justify-center p-6 mb-8 border-2 rounded">
        {!isUploaded && (
          <UploadIcon
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => setIsUploaded(true)}
          />
        )}
        {isUploaded && <p className="text-green-500 whitespace-nowrap">✓ Uploaded</p>}
      </div>
    </>
  );
};

const TakeKYCPhotoInteractiveFormItem = () => {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <>
      <p className="mb-2">Take photo for KYC check</p>
      <div className="flex items-center justify-center p-6 mb-8 border-2 rounded">
        {!isUploaded && (
          <CameraIcon
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => setIsUploaded(true)}
          />
        )}
        {isUploaded && <p className="text-green-500 whitespace-nowrap">✓ Uploaded</p>}
      </div>
    </>
  );
};

const OnboardingForm = ({ handleFormSubmit }) => (
  <>
    <h2 className="mb-6 text-center text-gray-800 text-l">
      At {BANK_NAME}, safeguarding your privacy and ensuring seamless control over your data is our
      utmost priority. We are dedicated to making your banking experience as effortless as possible.
      You’ll only need to enter your details once, after which we will provide you with reusable
      credentials, unlocking a world of services and exclusive deals as a member of {BANK_NAME}.
    </h2>
    <CustomerInfoForm title="New Customer Onboard" handleFormSubmit={handleFormSubmit}>
      <UploadKYCDocumentsInteractiveFormItem />
      <TakeKYCPhotoInteractiveFormItem />
    </CustomerInfoForm>
  </>
);

const OnboardingSuccess = ({ handleSubmit }) => (
  <div className="mx-auto w-fit">
    <h2 className="mb-6 text-center text-gray-800 text-l">
      Congratulations on joining {BANK_NAME}! We have successfully sent secure credentials. These
      credentials are exclusively yours, empowering you to seamlessly access your account and an
      array of services:
    </h2>
    <div className="flex flex-wrap justify-between gap-2 mb-6 text-gray-800 text-l">
      {[
        'Customer Credential',
        'Bank Account Details',
        'KYC Credential',
        'Reward Program',
        'Proof of Address',
      ].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full" />
          <div>{item}</div>
        </div>
      ))}
    </div>
    <KYCPassed />
    <Button type="button" onClick={handleSubmit} className="block w-full">
      Submit
    </Button>
  </div>
);

export default function Onboarding() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [holderDID] = useLocalStorage('holderDID', process.env.NEXT_PUBLIC_HOLDER_DID);
  const [recipientEmail] = useLocalStorage('recipientEmail', process.env.NEXT_PUBLIC_RECIPIENT_EMAIL);
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${SERVER_URL}/api/issue`,
        {},
        {
          params: {
            holderDID,
            recipientEmail,
          },
        }
      );

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
    <PageLayout title={`${BANK_NAME} - Onboarding`}>
      <div className="w-full px-8 md:px-32 lg:px-24">
        {!isSubmitted && <OnboardingForm handleFormSubmit={handleFormSubmit} />}
        {isSubmitted && <OnboardingSuccess handleSubmit={handleOnboardingSuccessSubmit} />}
      </div>
    </PageLayout>
  );
}
