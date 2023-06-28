import React from 'react';

const CensoredText = ({ width = 200, height = 80 }) => (
  <svg id="censored-lines" xmlns="http://www.w3.org/2000/svg" viewBox="9 14 170 47" width={width} height={height}>
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="translate(8.473108 13.305943)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(1.714284 0 0 1 41.637514 13.305943)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(2.071436 0 0 1 51.841729 31.163694)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(1.749998 0 0 1 117.660483 31.163694)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(1.32143 0 0 1 8.473108 31.163694)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(1.32143 0 0 1 62.556461 49.021443)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(2.428559 0 0 1 105.925679 49.021443)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(1.749998 0 0 1 8.473108 49.021443)" fill="#9a9a9a" strokeWidth="0" />
    <rect width="28.57239" height="11.735089" rx="1" ry="1" transform="matrix(2.928564 0 0 1 95.721048 13.305943)" fill="#9a9a9a" strokeWidth="0" />
  </svg>
);

export default CensoredText;
