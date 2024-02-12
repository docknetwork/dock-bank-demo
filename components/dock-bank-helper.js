import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'utils/hooks';
import { validateEmail } from 'utils/validation';
import userStore from 'store/appStore';
import { Button } from './ui/button';
import QrReader from './qr-reader';

export default function Helper() {
  const [holderDID, setHolderDID] = useLocalStorage('holderDID', '');
  const [recipientEmail, setRecipientEmail] = useLocalStorage('recipientEmail', '');
  const [emailError, setEmailError] = useState('');

  const isHelperOpen = userStore((state) => state.isHelperOpen);
  const setIsHelperOpen = userStore((state) => state.setIsHelperOpen);
  const formDID = userStore((state) => state.Did);
  const setFormDID = userStore((state) => state.setDid);
  const formRecipientEmail = userStore((state) => state.userEmail);
  const setFormRecipientEmail = userStore((state) => state.setUserEmail);

  useEffect(() => {
    setFormDID(holderDID);
    setFormRecipientEmail(recipientEmail);
    // eslint-disable-next-line
  }, [holderDID, recipientEmail]);

  const handleSubmit = () => {
    if (!formDID || !formRecipientEmail) {
      toast.warning('Please fill all fields');
      return;
    }

    if (!validateEmail(formRecipientEmail)) {
      setEmailError('Invalid email address');
      return;
    }

    setEmailError('');
    setHolderDID(formDID);
    setRecipientEmail(formRecipientEmail);
    toast.success('Set DID success');
    setIsHelperOpen(!isHelperOpen);
  };

  return (
    <>
      <Button
        className="fixed bottom-2 right-2 index-2"
        type="button"
        onClick={() => setIsHelperOpen(!isHelperOpen)}
      >
        Helper
        <div
          className={`absolute inline-flex items-center justify-center w-3| bg-${formDID && formRecipientEmail ? 'green' : 'red'
            }-500 rounded-full -top-1 -left-1`}
        />
      </Button>

      {isHelperOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full max-w-screen-md m-auto max-h-full p-4 overflow-x-hidden overflow-y-auto">
          <div className="relative bg-white rounded-lg shadow-lg">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">Helper</h3>
              <div
                className={`absolute inline-flex items-center justify-center w-3 bg-${formDID && formRecipientEmail ? 'green' : 'red'
                  }-500 rounded-full top-2 left-2`}
              />
              <button
                onClick={() => setIsHelperOpen(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col items-center p-4 space-y-8">
              <p>Input your DID or Scan it using the Qr Reader:</p>

              <QrReader setDID={setFormDID} />
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
              <p>Current loaded holder email:</p>

              <div className="flex items-center w-full px-3 py-2 border-2 rounded">
                <input
                  className={`w-full pl-2 border-none outline-none ${emailError ? 'border-red-500' : ''
                    }`}
                  type="text"
                  name="recipientEmail"
                  placeholder="alice@dock.io"
                  value={formRecipientEmail}
                  onChange={(e) => {
                    setFormRecipientEmail(e.target.value);
                    setEmailError('');
                  }}
                />
              </div>
              {emailError && <p className="text-red-500">{emailError}</p>}
              <Button onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
