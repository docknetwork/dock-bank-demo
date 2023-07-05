import React, { useState } from 'react';

import PageLayout from 'components/page-layout';
import RequireProof from 'components/require-proof';
import Button from 'components/button';
import InteractiveFormField from 'components/interactive-form-field';
import { informations } from 'utils';

import { BANK_NAME } from 'utils/constants';

const CustomerInfoForm = ({ handleFormSubmit }) => (
  <form onSubmit={handleFormSubmit} className="grid w-full grid-cols-2 gap-4 p-8 mx-auto">
    <div className="w-full">
      <InteractiveFormField
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={informations.name}
        verified
      />
      <InteractiveFormField
        id="address"
        type="text"
        name="address"
        placeholder="Address"
        value={informations.address}
        verified
      />
      <InteractiveFormField
        id="reward-id"
        type="text"
        name="rewardId"
        placeholder="Reward ID"
        value={informations.rewardId}
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckCompleted, setIsCheckCompleted] = useState(true);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageLayout title={!isCheckCompleted ? `${BANK_NAME} Freedom Rewards` : 'Checkout'}>
      {!isCheckCompleted && (
        <h2 className="mb-6 font-bold text-center text-gray-800 text-l">
          {BANK_NAME} members receive 20% off
        </h2>
      )}
      {!isSubmitted && !isCheckCompleted && (
        <RewardsProgramForm handleFormSubmit={handleFormSubmit} />
      )}
      {isSubmitted && !isCheckCompleted && (
        <>
          <p className="mb-8 text-center text-gray-800">
            Scan to share your information and confirm membership
          </p>
          <RequireProof type="proofForRewards" onPresentedProof={() => setIsCheckCompleted(true)} />
        </>
      )}
      {isCheckCompleted && <CustomerInfoForm handleFormSubmit={handleFormSubmit} />}
    </PageLayout>
  );
}
