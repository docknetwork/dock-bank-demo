import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const informations = {
  name: 'Alice Doe',
  address: '123 Main St',
  email: 'alice@dock.io',
  phone: '555-555-5555',
  dateOfBirth: '1990-01-01',
  rewardId: '123123123',
  bookingDates: '2022-12-23 - 2022-12-28',
  bookingNoOfGuests: 5,
  bookingRoomType: 'Deluxe',
};

export const textFields = [
  {
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    id: 'name',
    value: informations.name,
    credentialType: 'CustomerCredential',
  },
  {
    name: 'email',
    placeholder: 'Email Address',
    type: 'email',
    id: 'email',
    value: informations.email,
    credentialType: 'CustomerCredential',
  },
  {
    name: 'address',
    placeholder: 'Address',
    type: 'text',
    id: 'address',
    value: informations.address,
    credentialType: 'ProofOfAddress',
  },
  {
    name: 'dateOfBirth',
    placeholder: 'DOB',
    type: 'date',
    id: 'date-of-birth',
    value: informations.dateOfBirth,
    credentialType: 'CustomerCredential',
  },
  {
    name: 'phone',
    placeholder: 'Phone Number',
    type: 'tel',
    id: 'phone',
    value: informations.phone,
    credentialType: 'CustomerCredential',
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

export const extractCredentialSubjectFromProofRequest = (proofRequest, type) => proofRequest
  ?.presentation
  ?.credentials
  ?.find((credential) => credential.type.includes(type))
  ?.credentialSubject || null;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default {
  cn,
  textFields,
  kycSteps,
  informations,
  extractCredentialSubjectFromProofRequest,
};

export function getRandomNumber(min, max) {
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value.");
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Minimum and maximum values must be integers.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}