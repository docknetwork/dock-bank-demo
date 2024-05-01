import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';

/**
 * @description Form Field for user info such as complete address
 * @param {*} control  react hook form controller
 * @memberof QuotientBankForm, QuotientApplyLoanForm
 * @returns React.FC Form Field
 */
const FormFieldAddress = ({ control, applicant }) => (
  <div className='grid gap-2'>
    <h2 className='text-lg font-semibold'>What is your home address?</h2>
    <div className='grid grid-cols-2 gap-2'>
      <FormField
        control={control}
        name="streetAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <Input placeholder="Enter street address" {...field} data={applicant.streetAddress}
/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      <FormField
        control={control}
        name="suite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Suite (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter suite" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>
    <div className='flex gap-2'>
      <FormField
        control={control}
        name="zipCode"
        render={({ field }) => (
          <FormItem className='w-15'>
            <FormLabel>Zip Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter Zip Code" {...field} data={applicant.zipCode} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem className='w-60'>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="Enter city" {...field} data={applicant.city} className='flex h-10'/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      <FormField
        control={control}
        name="state"
        render={({ field }) => (
          <FormItem className='w-30'>
            <FormLabel>State</FormLabel>
            <FormControl>
              <Input placeholder="Select one" {...field} data={applicant.state} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>
  </div>
);

export default FormFieldAddress;
