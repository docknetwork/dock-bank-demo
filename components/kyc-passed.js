import React from 'react';
import {
  kycSteps,
} from 'utils';

const KYCPassed = () => (
  <div className="p-10 mx-auto border rounded shadow w-fit">
    <p>KYC check passed</p>
    {kycSteps.map((step) => (
      <div key={step.id} className="flex items-center">
        <input
          id={step.id}
          className="w-4 h-4 mr-2 border-2 rounded-full accent-gray-400"
          type="checkbox"
          name={step.name}
          checked={step.checked}
        />
        <p className="text-gray-400 line-through">{step.label}</p>
      </div>
    ))}
    <p>Verified by IDProvider</p>
  </div>
);

export default KYCPassed;
