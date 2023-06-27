export const informations = {
  name: 'Alice Doe',
  address: '123 Main St',
  email: 'alice@dock.io',
  phone: '555-555-5555',
  dateOfBirth: '1990-01-01',
  password: 'dockdemo',
  bookingDates: '2022-12-23 - 2022-12-28',
  bookingNoOfGuests: 5,
  bookingRoomType: 'Deluxe',
  rewardId: '123123123',
};

export const textFields = [
  {
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    id: 'name',
    value: informations.name,
  },
  {
    name: 'email',
    placeholder: 'Email Address',
    type: 'email',
    id: 'email',
    value: informations.email,
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    id: 'password',
    value: informations.password,
  },
  {
    name: 'address',
    placeholder: 'Address',
    type: 'text',
    id: 'address',
    value: informations.address,
  },
  {
    name: 'dateOfBirth',
    placeholder: 'DOB',
    type: 'date',
    id: 'date-of-birth',
    value: informations.dateOfBirth,
  },
  {
    name: 'phone',
    placeholder: 'Phone Number',
    type: 'tel',
    id: 'phone',
    value: informations.phone,
  }
];

export const kycSteps = [
  {
    name: 'identity',
    label: 'Identity',
    id: 'identity',
    checked: true,
  },
  {
    name: 'proofOfAddress',
    label: 'Proof of address',
    id: 'proof-of-address',
    checked: true,
  },
  {
    name: 'aml',
    label: 'AML',
    id: 'aml',
    checked: true,
  },
  {
    name: 'sanctions',
    label: 'Sanctions',
    id: 'sanctions',
    checked: true,
  },
  {
    name: 'criminalCheck',
    label: 'Criminal check',
    id: 'criminal-check',
    checked: true,
  }
];

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  'http://localhost:3000';

export default {
  textFields,
  kycSteps,
  informations,
  SERVER_URL,
};
