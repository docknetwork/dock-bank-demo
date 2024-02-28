import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function PageLayout({ children }) {
  return (
    <>
      <ToastContainer />
      <div>
        {children}
      </div>
    </>
  );
}
