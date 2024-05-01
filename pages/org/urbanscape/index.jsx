import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'sonner';
import Header from 'components/org/urbanscape/header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppartmentApplicationSchema } from 'lib/zodSchemas';
import { Form } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import UrbanscapeSuccess from 'components/org/urbanscape/urbanscape-success';
import FormFieldApplicantId from 'components/forms/urbanscape/form-field-applicant';
import FormFieldAddress from 'components/forms/form-field-address';
import FormFieldPersonalContact from 'components/forms/form-field-personal-contact';
import FormFieldOccupants from 'components/forms/urbanscape/form-field-occupants';
import QrCodeAuthentication from 'components/qrcode/qr-auth';
import qrCodeVerificationData from 'data/qrcode-text-data';
import useQrCode from 'hooks/useQrCode';
import { PROOFT_TEMPLATES_IDS } from 'utils/constants';
import qrCodeStore from 'store/qrCodeStore';

const DEFAULT_FORM_VALUES = {
    applicantFirstName: '',
    applicantLastName: '',
    dob: new Date('1985-02-15'),
    ssn: '248987821', // social security number,
    driversLicense: 'a0123456', // social security number,
    issueState: 'CA',
    streetAddress: '',
    suite: '',
    zipCode: '',
    city: '',
    state: '',
    email: 'euanmiller@email.com',
    phoneNumber: '12312312321',
    occupants: [
        {
            firstName: '',
            middleName: '',
            lastName: ''
        }
    ]
};

/**
 * @description Urbanscape Form to application for appartment.
 * @todo refactor this page by making code more modular
 * @returns React.FC page
 */
const UrbanScapePage = () => {
    const proofTemplateId = PROOFT_TEMPLATES_IDS.URBANSCAPE_BANKBIO;
    const [applicant, setApplicant] = useState({
        firstName: {
            text: '',
            isVerified: false
        },
        lastName: {
            text: '',
            isVerified: false
        },
        streetAddress: {
            text: '',
            isVerified: false
        },
        city: {
            text: '',
            isVerified: false
        },
        zipCode: {
            text: '',
            isVerified: false
        },
        state: {
            text: '',
            isVerified: false
        },
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const retrievedData = qrCodeStore((state) => state.retrievedData);
    const verified = qrCodeStore((state) => state.verified);

    const form = useForm({
        resolver: zodResolver(AppartmentApplicationSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: DEFAULT_FORM_VALUES,
    });

    // once form values are valid, do something
    async function onSubmit(values) {
        console.log('onSubmit:values', { values });
        toast.info('Form submitted, should approve application');
        setIsSuccess(true);
    }

    const { refetch } = useQrCode({ proofTemplateId });

    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (verified === true && retrievedData !== null) {
            setTimeout(() => {
                const credential = retrievedData.credentials.find((obj) => Object.prototype.hasOwnProperty.call(obj.credentialSubject, 'address'));
                if (credential) {
                    console.log('CREDENTIAL: ', credential);
                    const username = credential.credentialSubject.name.split(' ');
                    setApplicant({
                        firstName: {
                            text: username[0],
                            isVerified: true
                        },
                        lastName: {
                            text: username[1],
                            isVerified: true
                        },
                        streetAddress: {
                            text: credential.credentialSubject.address,
                            isVerified: true
                        },
                        city: {
                            text: credential.credentialSubject.city,
                            isVerified: true
                        },
                        zipCode: {
                            text: credential.credentialSubject.zip,
                            isVerified: true
                        },
                        state: {
                            text: credential.credentialSubject.state,
                            isVerified: true
                        },
                    });
                    form.setValue('applicantFirstName', username[0]);
                    form.setValue('applicantLastName', username[1]);
                    form.setValue('occupants', [{
                        firstName: username[0],
                        middleName: '',
                        lastName: username[1]
                    }]);
                    form.setValue('streetAddress', credential.credentialSubject.address);
                    form.setValue('city', credential.credentialSubject.city);
                    form.setValue('zipCode', credential.credentialSubject.zip);
                    form.setValue('state', credential.credentialSubject.state);
                }
            }, 1000);
        }
        // eslint-disable-next-line
    }, [verified, retrievedData]);

    return (
        <>
            <Head>
                <title>Urbanscape - Application for Apartment</title>
            </Head>
            <Header />
            <div className='p-4 min-h-screen mainContainer'>
                {isSuccess ? (
                    <UrbanscapeSuccess />
                ) : (
                    <>
                        <div className='mb-4 mt-2'>
                            <h2 className='font-medium text-3xl text-slate-700'>Application for Apartment</h2>
                            <p className='font-medium text-base'>Auto fill this form by using your banking app. Scan the QR Code on the right.</p>
                        </div>
                        <Form {...form}>
                            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='flex gap-4 flex-wrap'>
                                    <div className='flex-1 w-full xl:w-2/3 md:w-2/3 space-y-4'>
                                        <div className='space-y-2'>
                                            <h2 className='text-urban font-bold'>APPLICANT INFORMATION</h2>
                                            <div className='p-4 bg-neutral-50 rounded-lg space-y-5'>
                                                <FormFieldApplicantId control={form.control} applicant={applicant} />
                                                <Separator />
                                                <FormFieldAddress control={form.control} applicant={applicant} />
                                                <Separator />
                                                <FormFieldPersonalContact control={form.control} />
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className='font-semibold'>NAMES AND AGES OF ALL PERSONS TO OCCUPY APARTMENT</h2>
                                            <div className='p-4 bg-neutral-50 rounded-lg space-y-5'>
                                                <FormFieldOccupants control={form.control} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='flex-2 w-full md:w-1/3 xl:w-1/3'>
                                        <QrCodeAuthentication
                                            required={true}
                                            proofTemplateId={proofTemplateId}
                                            title={qrCodeVerificationData.URBAN_BANKBIO.title}
                                            qrText={qrCodeVerificationData.URBAN_BANKBIO.qrText}
                                            qrTextAfter={qrCodeVerificationData.URBAN_BANKBIO.qrTextAfter}
                                        />
                                    </div>
                                </div>

                                <div className='mt-3'>
                                    <Button
                                        className='col-span-2 w-fit md:place-self-end px-10 bg-emerald-700 text-lg'
                                        type='submit'>
                                        Submit Application
                                    </Button>
                                </div>

                            </form>
                        </Form>
                    </>
                )}
            </div>
        </>
    );
};

export default UrbanScapePage;
