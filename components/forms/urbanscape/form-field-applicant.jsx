import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { BirthdayPicker } from '../form-field-id';

const FormFieldApplicantId = ({ control }) => (
    <>
        <div className='grid grid-cols-3 gap-2'>
            <FormField
                control={control}
                name="applicantFirstName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter first Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={control}
                name="applicantLastName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            <BirthdayPicker control={control} />
        </div>
        <div className='grid grid-cols-3 gap-2 '>
            <FormField
                control={control}
                name="ssn"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Social Security #</FormLabel>
                        <FormControl>
                            <Input placeholder="XXX-XX-XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={control}
                name="driversLicense"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Drivers License #</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter drivers license number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={control}
                name="issueState"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Issue State</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter issue state" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
        </div>
    </>
);

export default FormFieldApplicantId;
