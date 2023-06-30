import React, { useState } from 'react';

import Button from 'components/button';
import { useLocalStorage } from 'utils/hooks';

export default function Helper() {
  const [isHelperOpen, setIsHelperOpen] = useState(false);

  const [holderDID, setHolderDID] = useLocalStorage('holderDID', null);
  const [formDID, setFormDID] = useState('');

  const actionsNeeded = !holderDID;

  // This is needed because the tailwind JIT compiler doesn't support dynamic classes
  // eslint-disable-next-line no-unused-vars
  const indicatorBGs = ['bg-green-500', 'bg-red-500'];

  return (
    <>
      <Button
        className="fixed bottom-2 right-2"
        type="button"
        onClick={() => setIsHelperOpen(!isHelperOpen)}
      >
        Helper
        <div className={`absolute inline-flex items-center justify-center w-3 h-3 bg-${actionsNeeded ? 'red' : 'green'}-500 rounded-full -top-1 -left-1`} />
      </Button>
      {isHelperOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full max-h-full p-4 overflow-x-hidden overflow-y-auto">
          <div className="fixed inset-0 bg-gray-500 opacity-50" />
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Helper
              </h3>
              <button onClick={() => setIsHelperOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col items-center p-4 space-y-8">
              <p>Current loaded holder DID:</p>
              <p>{holderDID}</p>
              <div className="flex items-center w-full px-3 py-2 border-2 rounded">
                <input
                  className="w-full pl-2 border-none outline-none"
                  type="text"
                  name="holderDID"
                  placeholder="did:dock:xyz"
                  value={formDID}
                  onChange={(e) => setFormDID(e.target.value)}
                />
              </div>
              <Button
                type="button"
                onClick={() => setHolderDID(formDID)}
                disabled={!formDID}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
