import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { Input } from 'components/ui/input';

const FormFieldPersonalContact = ({ control }) => (
  <div className='grid gap-2'>
    <h2 className='text-lg font-semibold'>What is your contact info?</h2>
    <div className='grid grid-cols-2 gap-2'>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input placeholder="Enter email address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number (mobile preferred)</FormLabel>
            <FormControl>
              <Input placeholder="Enter phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>
    <div className='grid grid-cols-3 gap-2'>
      <FormField
        control={control}
        name="isUsaCitizen"
        render={({ field }) => (
          <FormItem>
            <FormLabel>U.S Citizen?</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem disabled={field.value === 'true' } value={'true'}>Yes</SelectItem>
                <SelectItem disabled={field.value === 'false' } value={'false'}>No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      <FormField
        control={control}
        name="ssn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Social Security Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter SSN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>
  </div>
);

export default FormFieldPersonalContact;
