import React, { useState } from 'react';

import RequireProof from 'components/require-proof';
import PageLayout from 'components/page-layout';

import { BANK_NAME } from 'utils/constants';

const CustomerServiceInfo = ({ onPresentedProof }) => (
  <div className="w-full max-w-md p-8 mx-auto text-center border rounded shadow">
    <h2 className="mb-6 font-bold text-gray-800 text-l">Customer Services Portal</h2>
    <p className="mb-8 text-gray-800">Call: 1-800-572-3489</p>
    <p className="mb-8 text-gray-800">Chat support</p>
    <p className="mb-8 text-gray-800">Scan to confirm your identity</p>
    <RequireProof type="proofOfCustomer" onPresentedProof={onPresentedProof} />
  </div>
);

const CustomerServiceValidated = () => (
  <div className="w-full max-w-md p-8 mx-auto text-center border rounded shadow">
    <h2 className="mb-6 font-bold text-gray-800 text-l">Customer Services Portal</h2>
    <h3 className="mb-6 font-bold text-gray-800 text-l">Customer identity verified</h3>
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
