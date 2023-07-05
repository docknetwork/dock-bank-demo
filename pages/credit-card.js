import React, { useState } from 'react';

import KYCPassed from 'components/kyc-passed';
import CustomerInfoForm from 'components/customer-info-form';
import PageLayout from 'components/page-layout';
import RequireProof from 'components/require-proof';

import { BANK_NAME } from 'utils/constants';

const CreditCardQRCode = ({ onPresentedProof }) => (
  <div className="p-8 mx-auto border-4 border-dashed">
    <h2 className="mb-6 font-bold text-gray-800 text-l">Instant approval</h2>
    <p className="mb-8 text-gray-800">
      Fast-track your application and save time completing forms by sharing your credentials and
      verification check
    </p>
    <RequireProof type="proofForCreditCard" onPresentedProof={onPresentedProof} />
  </div>
);

export default function CreditCard() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleApplicationSubmit = (event) => {
    event.preventDefault();
    setIsApplicationSubmitted(true);
  };

  return (
    <PageLayout title={`${BANK_NAME} - Credit card`}>
      {!isFormSubmitted && !isApplicationSubmitted && (
        <div className="grid w-full grid-cols-2 gap-2 px-8 md:px-32 lg:px-24">
          <div className="border-4 border-dashed">
            <CustomerInfoForm
              title="Online form"
              description="Application review ca take 5-10 business days and you may be contacted for additional informations"
              handleFormSubmit={handleFormSubmit}
            />
          </div>
          <CreditCardQRCode onPresentedProof={() => setIsFormSubmitted(true)} />
        </div>
      )}
      {isFormSubmitted && !isApplicationSubmitted && (
        <CustomerInfoForm handleFormSubmit={handleApplicationSubmit} verified>
          <KYCPassed />
        </CustomerInfoForm>
      )}
      {isApplicationSubmitted && (
        <h2 className="px-8 mb-6 font-bold text-center text-gray-800 text-l">
          By securely sharing your bank credentials, you&apos;ve been instantly approved for a{' '}
          {BANK_NAME} credit card! Start using it today!
        </h2>
      )}
    </PageLayout>
  );
}
