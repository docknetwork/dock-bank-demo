import { z } from 'zod';

// pages/quotient/index
export const UserSchema = z.object({
    firstName: z.string().min(2, {
        message: 'First Name must be at least 2 characters.',
    }),
    middleName: z.string().min(2, {
        message: 'Middle Name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Last Name must be at least 2 characters.',
    }),
    suffix: z.string().optional(),
    dob: z.date({
        required_error: 'A date of birth is required.',
    }), // Date Of Birthday
    streetAddress: z.string().min(2, {
        message: 'Street Address must be at least 2 characters.',
    }),
    suite: z.string().optional(),
    zipCode: z.string().min(2, {
        message: 'Zip Code must be at least 2 characters',
    }),
    city: z.string().min(2, {
        message: 'City must be at least 2 characters.',
    }),
    state: z.string().min(2, {
        message: 'State must be at least 2 characters.',
    }),
    email: z.string().email({ message: 'Please provide a valid email address' }),
    phoneNumber: z.string().min(6, {
        message: 'Phone number must be at least 6 characters',
    }),
    isUsaCitizen: z
        .string()
        .min(2, { message: 'Please Select an option' })
        .transform((value) => value.toLowerCase() === 'true'),
    ssn: z.string().min(4, {
        message: 'Social Security Number must be at least 4 characters',
    }),
    govId: z.string().endsWith('.png'),
    webcamPic: z.string().endsWith('.png'),
});

// pages/quotient/loan
export const LoanSchema = z.object({
    sellerName: z.string().min(2, {
        message: 'Seller Name must be at least 2 characters.',
    }),
    newOrUsed: z.enum(['Used', 'New']),
    year: z.string().max(4, {
        message: 'Car year must contain 4 characters.',
    }),
    mileage: z.string().min(2, {
        message: 'Car mileage must be at least 2 characters.',
    }),
    make: z.string().min(3, {
        message: 'Car maker must be at least 3 characters.',
    }),
    model: z.string().min(2, {
        message: 'Car model must be at least 2 characters.',
    }),
    price: z.string().min(2, {
        message: 'Car price must be at least 2 characters.',
    }),
    firstName: z.string().min(2, {
        message: 'First Name must be at least 2 characters.',
    }),
    middleName: z.string().min(2, {
        message: 'Middle Name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Las Name must be at least 2 characters.',
    }),
    suffix: z.string().optional(),
    streetAddress: z.string().min(2, {
        message: 'Street Address must be at least 2 characters.',
    }),
    suite: z.string().optional(),
    zipCode: z.string().min(2, {
        message: 'Zip Code must be at least 2 characters',
    }),
    city: z.string().min(2, {
        message: 'City must be at least 2 characters.',
    }),
    state: z.string().min(2, {
        message: 'State must be at least 2 characters.',
    }),
    email: z.string().email({ message: 'Please provide a valid email address' }),
    phoneNumber: z.string().min(6, {
        message: 'Phone number must be at least 6 characters',
    }),
});