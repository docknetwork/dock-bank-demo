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
import { issueCredentials } from 'utils/credentialsUtils';
import { toast } from 'sonner';
import { userStore } from 'store/appStore';

const DEFAULT_FORM_VALUES = {
    firstName: 'ken',
    middleName: 'zambrano',
    lastName: 'de jesus',
    suffix: 'asdasdads',
    dob: '05/19/1992', // Date Of Birthday
    streetAddress: 'asdasdasd',
    suite: 'asdasd',
    zipCode: '1233',
    city: 'caracas',
    state: 'caracas',
    email: 'asdg@gmail.com',
    phoneNumber: '12312312321',
    isUsaCitizen: 'Yes',
    ssn: 'qwdqwd', // social security number,
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
    const receiverDid = userStore((state) => state.Did);
    const setIsHelperOpen = userStore((state) => state.setIsHelperOpen)

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
        // eslint-disable-next-line no-promise-executor-return
        if (!receiverDid || receiverDid.length < 3) {
            toast.info('Please add your Did and email in the helper box');
            setIsHelperOpen(true)
            return
        }

        setIsLoading(true);

        try {
            const result = await issueCredentials(receiverDid, setIsLoading, setIsSuccess);
            console.log("results:", result)

        } catch (error) {
            setIsLoading(false);
            toast.error('Something went wrong, try again or contact support')
            console.log('issuing error: ', error);
        }

    }

    return (
        <>
            <Head>
                <title>Quotient - Open New Bank Account</title >
            </Head >
            <Header />
            <LoadingModal isLoading={isLoading} setIsLoading={setIsLoading} />
            {isSuccess ? (
                <div className='pt-10 pl-5'>
                    <h2 className='text-2xl font-semibold'>Your account has been opened!</h2>
                </div>
            ) : (
                <div className="p-4 min-h-screen mainContainer">
                    <div className='mb-4 mt-2'>
                        <h2 className='font-semibold text-2xl'>Open New Banking Account</h2 >
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-2">
                            <div className='p-4 bg-neutral-50 rounded-lg space-y-5'>
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
                            <Button className='col-span-2 w-fit md:place-self-end px-10 bg-emerald-700 text-lg' type="submit">Submit Application</Button>
                        </form>

                    </Form>

                </div >
            )
            }
        </>
    );
};

export default QuotientBankForm;
