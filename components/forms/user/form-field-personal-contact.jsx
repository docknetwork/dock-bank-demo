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
import { Separator } from 'components/ui/separator';

/**
 * @description Form Field for email, phone number & UsaCitizen comp
 * @param {*} control  react hook form controller
 * @param {*} isUsaCitizen shows | !show UsaCitizen comp
 * @returns React.FC Form Field
 */
const FormFieldPersonalContact = ({ control, isUsaCitizen }) => (
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
    <UsaCitizen control={control} usaCitizen={isUsaCitizen} />
  </div>
);

/**
 * @description Form Field for usa citizen & social security number
 * @param {*} control  react hook form controller
 * @param {*} usaCitizen shows | !show BirthdayPicker comp
 * @returns React.FC Form Field 
 */
const UsaCitizen = ({ control, usaCitizen }) => (
  <>
    <div className='mt-4 mb-4'>
      <Separator />
    </div>
    <h2 className='text-lg font-semibold'>Personal Information</h2>
    <div className='flex gap-2' >
      <FormField
        control={control}
        name="isUsaCitizen"
        render={({ field }) => (
          <FormItem className='w-20'>
            <FormLabel>U.S Citizen?</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem disabled={field.value === 'true'} value={'true'}>Yes</SelectItem>
                <SelectItem disabled={field.value === 'false'} value={'false'}>No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      <FormField
        control={control}
        name="ssn"
        render={({ field }) => (
          <FormItem className='w-80'>
            <FormLabel>Social Security Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter SSN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>
  </>
);

export default FormFieldPersonalContact;
