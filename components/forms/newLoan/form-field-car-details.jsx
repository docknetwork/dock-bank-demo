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

/**
 * @description Form Field for loan car info
 * @param {*} control  react hook form controller
 * @memberof QuotientApplyLoanForm
 * @returns React.FC Form Field
 */
const FormFieldCarDetails = ({ control }) => (
    <>
        <h2 className='font-semibold'>Tell us about the car you are wanting to purchase</h2>
        <div className='grid grid-cols-1 gap-2'>
            <FormField
                control={control}
                name="sellerName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Who is selling the car</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter seller Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            <div className='grid grid-cols-3 gap-2'>
                <FormField
                    control={control}
                    name="newOrUsed"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New or Used</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select one" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem disabled={field.value === 'New'} value={'New'}>New</SelectItem>
                                    <SelectItem disabled={field.value === 'Used'} value={'Used'}>Used</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Year" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={control}
                    name="mileage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mileage</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter mileage of car" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <FormField
                    control={control}
                    name="make"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Make</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter make of car" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter model of car" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
            </div>
            <FormField
                control={control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Asking Price</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter price of car" {...field} className="w-1/2" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
        </div>
    </>
);

export default FormFieldCarDetails;
