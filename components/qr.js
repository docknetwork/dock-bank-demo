import React from 'react';
import QRCode from 'react-qr-code';

export default function QRDisplay({ value }) {
  return value ? (
    <div className="flex flex-col items-center justify-center">
      <div style={{ background: 'white', padding: '16px' }}>
        <QRCode value={value} />
      </div>
      <div className="flex justify-center w-full mt-6 md:mt-6 md:hidden">
        <a href={value} className="block px-6 py-3 mt-5 mb-2 text-xl font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:-translate-y-1 duration-250">
          Open Deep Link
        </a>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center">
      <div style={{ background: 'white', padding: '16px', width: '256px', height: '256px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading
      </div>
    </div>
  );
}
