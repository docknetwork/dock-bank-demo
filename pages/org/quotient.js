import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import LoadingModal from 'components/org/quotient/LoadingModal';
import Header from 'components/org/quotient/Header';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form
} from 'components/ui/form';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import FormFieldNameAndBirthday from 'components/forms/user/newAccount/form-field-id';
import FormFieldAddress from 'components/forms/user/newAccount/form-field-address';
import FormFieldPersonalContact from 'components/forms/user/newAccount/form-field-personal-contact';
import FormFieldGovId from 'components/forms/user/newAccount/form-field-govId';

const DEFAULT_FORM_VALUES = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    dob: undefined, // Date Of Birthday
    streetAddress: '',
    suite: '',
    zipCode: '',
    city: '',
    state: '',
    email: '',
    phoneNumber: '',
    isUsaCitizen: '',
    ssn: '', // social security number,
    govId: '',
    webcamPic: ''
};

const userSchema = z.object({
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
    isUsaCitizen: z.string().min(2, { message: 'Please Select an option' }).transform((value) => value.toLowerCase() === 'true'),
    ssn: z.string().min(4, {
        message: 'Social Security Number must be at least 4 characters',
    }),
    govId: z.string().endsWith('.png'),
    webcamPic: z.string().endsWith('.png')
});

const QuotientBankForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isCaptureCompleted, setIsCaptureCompleted] = useState(false);
    const [imageSrc, setImageSrc] = useState(undefined);

    const form = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: DEFAULT_FORM_VALUES
    });

    useEffect(() => {
        // fetch the form values for images (should be empty at start)
        const [govId, webcamPic] = [form.getValues('govId'), form.getValues('webcamPic')];
        // if interacted with web cam component, will set the mocked values
        if (isCaptureCompleted && webcamPic === '') form.resetField('webcamPic', { defaultValue: '/example_webcam.png' });
        // if govId has been 'uploaded', set the mocked values
        if (imageSrc && govId === '') form.resetField('govId', { defaultValue: '/example_passport.png' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCaptureCompleted, imageSrc, form]);

    // once form values are valid, do something
    async function onSubmit(values) {
        console.log("values", values);
        setIsLoading(true);
        // eslint-disable-next-line no-promise-executor-return
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 3000);
    }

    return (
        <>
            <Head>
                <title>Quotient - Open New Bank Account</title >
            </Head >
            <Header />
            <LoadingModal isLoading={isLoading} setIsLoading={setIsLoading} />
            {isSuccess ? (
                <d iv className='pt-10 pl-5'>
                    <h2 className='text-2xl font-semibold'>Your account has been opened!</h2>
                </d>
            ) : (
                <div className="p-4 min-h-screen mainContainer">
                    <h2 className='font-semibold text-lg'>Open New Banking Account</h2 >

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-2">
                            <div className='p-4 bg-neutral-50 rounded-lg space-y-8'>
                                <FormFieldNameAndBirthday control={form.control} />
                                <Separator />
                                <FormFieldAddress control={form.control} />
                                <Separator />
                                <FormFieldPersonalContact control={form.control} />
                            </div>
                            <FormFieldGovId
                                control={form.control}
                                isCaptureCompleted={isCaptureCompleted}
                                setIsCaptureCompleted={setIsCaptureCompleted}
                                imageSrc={imageSrc}
                                setImageSrc={setImageSrc}
                            />
                            <Button className='col-span-2 w-fit md:place-self-end px-2 bg-emerald-700' type="submit">Submit Application</Button>
                        </form>

                    </Form>

                </div >
            )
            }
        </>
    );
};

export default QuotientBankForm;
