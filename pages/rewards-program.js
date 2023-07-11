import React, { useState } from 'react';

import PageLayout from 'components/page-layout';
import RequireProof from 'components/require-proof';
import Button from 'components/button';
import InteractiveFormField from 'components/interactive-form-field';
import InfoAlert from 'components/info-alert';
import { informations, extractCredentialSubjectFromProofRequest } from 'utils';

import { BANK_NAME, HOTEL_NAME } from 'utils/constants';

const CustomerInfoForm = ({ handleFormSubmit, proofRequestData = null }) => (
  <form onSubmit={handleFormSubmit} className="grid w-full grid-cols-2 gap-4 p-8 mx-auto">
    <div className="w-full">
      <InteractiveFormField
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={
          proofRequestData
            ? extractCredentialSubjectFromProofRequest(proofRequestData, 'CustomerCredential')
                ?.name || ''
            : informations.name
        }
        verified
      />
      <InteractiveFormField
        id="address"
        type="text"
        name="address"
        placeholder="Address"
        value={
          proofRequestData
            ? extractCredentialSubjectFromProofRequest(proofRequestData, 'ProofOfAddress')
                ?.address || ''
            : informations.address
        }
        verified
      />
      <InteractiveFormField
        id="reward-id"
        type="text"
        name="rewardId"
        placeholder="Reward ID"
        value={
          proofRequestData
            ? extractCredentialSubjectFromProofRequest(proofRequestData, 'RewardsProgram')
                ?.rewardId || ''
            : informations.rewardId
        }
        verified
      />
      <div className="p-10 mx-auto border rounded shadow w-fit">
        <p>Background check passed</p>
        <div className="flex items-center">
          <input
            id="identity"
            className="w-4 h-4 mr-2 border-2 rounded-full accent-gray-400"
            type="checkbox"
            name="identity"
            checked
          />
          <p className="text-gray-400 line-through">Identity</p>
        </div>
        <div className="flex items-center">
          <input
            id="criminal-check"
            className="w-4 h-4 mr-2 border-2 rounded-full accent-gray-400"
            type="checkbox"
            name="criminalCheck"
            checked
          />
          <p className="text-gray-400 line-through">Criminal check</p>
        </div>
        <p>Verified by IDProvider</p>
      </div>
    </div>
    <div className="p-10 mx-auto border rounded shadow w-fit h-fit">
      <p>Summary</p>
      <p>5 night stay - $1,550</p>
      <p>20% Membership discount applied</p>
      <br />
      <p>Total: $1,240</p>
    </div>
    <Button className="w-full">Book my stay!</Button>
  </form>
);

const textFields = [
  {
    name: 'bookingDates',
    placeholder: 'Booking Period',
    type: 'text',
    id: 'booking-dates',
    value: informations.bookingDates,
  },
  {
    name: 'bookingNoOfGuests',
    placeholder: 'Number of Guests',
    type: 'text',
    id: 'booking-no-of-guests',
    value: informations.bookingNoOfGuests,
  },
  {
    name: 'bookingRoomType',
    placeholder: 'Room Type',
    type: 'text',
    id: 'booking-room-type',
    value: informations.bookingRoomType,
  },
];

const RewardsProgramForm = ({ handleFormSubmit }) => {
  const [isInputValuesSet, setIsInputValuesSet] = useState(
    textFields.reduce((acc, field) => {
      acc[field.id] = false;

      return acc;
    }, {})
  );

  return (
    <form onSubmit={handleFormSubmit} className="w-full max-w-lg p-8 mx-auto">
      {textFields.map((field) => (
        <InteractiveFormField
          key={field.id}
          id={field.id}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          verified={false}
          isValueSet={isInputValuesSet[field.id]}
          setIsValueSet={(value) => setIsInputValuesSet({ ...isInputValuesSet, [field.id]: value })}
        />
      ))}
      <Button className="w-full">Checkout</Button>
    </form>
  );
};

export default function RewardsProgram() {
  const [step, setStep] = useState(0);
  const [proofRequestData, setProofRequestData] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setStep((currentStep) => currentStep + 1);
  };

  const handlePresentedProof = (data) => {
    setProofRequestData(data);

    setStep((currentStep) => currentStep + 1);
  };

  return (
    <PageLayout
      title={step === 0 || step === 1 ? `${BANK_NAME} Freedom Rewards` : 'Checkout'}
      withSidebar={false}>
      {(step === 0 || step === 1) && (
        <div className="flex flex-col items-center justify-center bg-bottom bg-cover rounded bg-hero-resort h-96">
          <h2 className="text-2xl font-bold text-center text-slate-100">
            Share your membership information and unlock a 20% discount on your booking!
          </h2>
          <h3 className="mb-6 text-xl font-medium text-center text-slate-100">
            Plus, by sharing your verified information, you&apos;ll experience a seamless and easy
            stay. Savings and convenience are just a click away!
          </h3>
        </div>
      )}
      {step === 0 && <RewardsProgramForm handleFormSubmit={handleFormSubmit} />}
      {step === 1 && (
        <>
          <p className="mt-4 mb-2 text-center text-gray-800">
            Scan to share your information and confirm membership
          </p>
          <RequireProof type="proofForRewards" onPresentedProof={handlePresentedProof} />
          <InfoAlert>
            Required credentials: Customer Credential, Reward Program, Proof of Address
          </InfoAlert>
        </>
      )}
      {step === 2 && (
        <CustomerInfoForm handleFormSubmit={handleFormSubmit} proofRequestData={proofRequestData} />
      )}
      {step === 3 && (
        <h2 className="px-8 mb-6 font-bold text-center text-gray-800 text-l">
          Your stay has been booked! The following details have been shared with {HOTEL_NAME},
          confirming you as a qualified guest. Rest assured, they are well-prepared to ensure you
          have an exceptional stay.
        </h2>
      )}
    </PageLayout>
  );
}
