import React from 'react';
import { Trash } from 'lucide-react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';

const FormFieldOccupants = ({ control }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: 'occupants'
    });

    const onRemoveFormItem = (index) => {
        remove(index);
    };

    return (
        <div className="space-y-2">
            <div className="grid gap-2">
                {fields.map((item, index) => (
                    <div key={item.id} className='border rounded-lg p-2'>
                        {index >= 1 ? (
                            <div className="flex justify-between items-center">
                                <Button
                                    className='flex space-x-1'
                                    variant="destructive"
                                    onClick={() => onRemoveFormItem(index)}
                                >
                                    <p>Occupant {index + 1}</p>
                                    <Trash className='w-4 h-4' />
                                </Button>
                            </div>
                        ) : (
                            null
                        )}
                        <div className="grid gap-2 grid-cols-3 ">
                            <FormField
                                control={control}
                                name={`occupants.${index}.firstName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter first name"
                                                {...field}
                                                value={field.value ? field.value : ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`occupants.${index}.middleName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter middle name"
                                                {...field}
                                                value={field.value ? field.value : ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`occupants.${index}.lastName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter last name"
                                                {...field}
                                                value={field.value ? field.value : ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                className="w-full md:w-fit"
                type="button"
                onClick={() => append({ firstName: '', middleName: '', lastName: '' })}
                variant="outline"
            >
                Add Occupant <Plus className='text-sm text-slate-400 ml-2' />
            </Button>
        </div>
    );
};

export default FormFieldOccupants;
