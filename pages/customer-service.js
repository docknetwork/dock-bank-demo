import React, { useState } from 'react';

import RequireProof from 'components/require-proof';
import PageLayout from 'components/page-layout';
import InfoAlert from 'components/info-alert';

import { BANK_NAME } from 'utils/constants';

const CustomerServiceInfo = ({ onPresentedProof }) => (
  <div className="w-full max-w-md p-8 mx-auto text-center border rounded shadow">
    <h2 className="mb-6 font-bold text-gray-800 text-l">Customer Services Portal</h2>
    <p className="mb-8 text-gray-800">Call: 1-800-572-3489</p>
    <p className="mb-8 text-gray-800">Chat support</p>
    <p className="mb-8 text-gray-800">
      To ensure a seamless customer service experience and safeguard your financial and identity
      information, please share your credentials. You&apos;ll be swiftly connected to an agent
      who&apos;s ready to assist you.
    </p>
    <RequireProof type="proofOfCustomer" onPresentedProof={onPresentedProof} />
    <InfoAlert>
      Required credentials: Customer Credential
    </InfoAlert>
  </div>
);

const CustomerServiceValidated = () => (
  <div className="w-full max-w-md p-8 mx-auto text-center border rounded shadow">
    <h2 className="mb-6 font-bold text-gray-800 text-l">Customer Services Portal</h2>
    <h3 className="mb-6 font-medium text-gray-800 text-l">
      Thank you for sharing your credentials and taking steps to protect your information. You are
      now being connected to an agent who is eager to assist you. We appreciate your trust in{' '}
      {BANK_NAME}.
    </h3>
  </div>
);

export default function CustomerService() {
  const [isValidated, setIsValidated] = useState(false);

  return (
    <PageLayout title={`${BANK_NAME} - Customer Service`}>
      {!isValidated && <CustomerServiceInfo onPresentedProof={() => setIsValidated(true)} />}
      {isValidated && <CustomerServiceValidated />}
    </PageLayout>
  );
}
