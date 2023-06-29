import React, { useState } from 'react';

import PageLayout from 'components/page-layout';
import PageTitle from 'components/page-title';
import RequireProof from 'components/require-proof';
import { informations } from 'utils';

const CustomerInfoForm = ({
  handleFormSubmit,
}) => (
    <form
      onSubmit={handleFormSubmit}
      className="grid w-full grid-cols-2 gap-4 p-8 mx-auto"
    >
      <div className="w-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center w-full px-3 py-2 border-2 rounded">
            <input
              id="name"
              className="w-full pl-2 border-none outline-none "
              type="text"
              name="name"
              placeholder="name"
              value={informations.name}
            />
          </div>
          <p className="text-green-500 whitespace-nowrap">✓ Verified</p>
        </div>
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center w-full px-3 py-2 border-2 rounded">
            <input
              id="address"
              className="w-full pl-2 border-none outline-none "
              type="text"
              name="address"
              placeholder="Address"
              value={informations.address}
            />
          </div>
          <p className="text-green-500 whitespace-nowrap">✓ Verified</p>
        </div>
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center w-full px-3 py-2 border-2 rounded">
            <input
              id="reward-id"
              className="w-full pl-2 border-none outline-none "
              type="text"
              name="rewardId"
              placeholder="Reward ID"
              value={informations.rewardId}
            />
          </div>
          <p className="text-green-500 whitespace-nowrap">✓ Verified</p>
        </div>
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
      <button
        type="submit"
        className="block w-full col-span-2 py-2 mt-5 mb-2 font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:-translate-y-1 duration-250"
      >
        Book my stay!
      </button>
    </form>
);

const RewardsProgramForm = ({ handleFormSubmit }) => (
  <form
    onSubmit={handleFormSubmit}
    className="w-full max-w-lg p-8 mx-auto"
  >
    <div className="flex items-center w-full px-3 py-2 mb-8 border-2 rounded">
      <input
        id="dates"
        className="w-full pl-2 border-none outline-none "
        type="text"
        name="dates"
        placeholder="Dates"
        value={informations.bookingDates}
      />
    </div>
    <div className="flex items-center w-full px-3 py-2 mb-8 border-2 rounded">
      <input
        id="no-of-guests"
        className="w-full pl-2 border-none outline-none "
        type="tel"
        name="noOfGuests"
        placeholder="# of Guests"
        value={informations.bookingNoOfGuests}
      />
    </div>
    <div className="flex items-center w-full px-3 py-2 mb-8 border-2 rounded">
      <select
        name="roomType"
        id="room-type"
        className="w-full pl-2 border-none outline-none"
        placeholder="Type of room"
      >
        <option value="basic" selected={informations.bookingRoomType === 'basic'}>Basic</option>
        <option value="deluxe" selected={informations.bookingRoomType === 'deluxe'}>Deluxe</option>
      </select>
    </div>
    <button
      type="submit"
      className="block w-full py-2 mt-5 mb-2 font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:-translate-y-1 duration-250"
    >
      Checkout
    </button>
  </form>
);

export default function RewardsProgram() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckCompleted, setIsCheckCompleted] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageLayout>
      <PageTitle>
        {!isCheckCompleted ? 'Dock Bank Freedom Rewards' : 'Checkout'}
      </PageTitle>
      {!isCheckCompleted && (
        <h2 className="mb-6 font-bold text-gray-800 text-l">Dock Bank members receive 20% off</h2>
      )}
      {!isSubmitted && !isCheckCompleted && (
        <RewardsProgramForm handleFormSubmit={handleFormSubmit} />
      )}
      {isSubmitted && !isCheckCompleted && (
        <>
          <p className="mb-8 text-gray-800">Scan to share your information and confirm membership</p>
          <RequireProof type="proofForRewards" onPresentedProof={() => setIsCheckCompleted(true)} />
        </>
      )}
      {isCheckCompleted && (
        <CustomerInfoForm handleFormSubmit={handleFormSubmit} />
      )}
    </PageLayout>
  );
}
