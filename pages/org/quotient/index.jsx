import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from 'lib/zodSchemas';
import { toast } from 'sonner';
import { Form } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { PROOFT_TEMPLATES_IDS } from 'utils/constants';
import { createBankIdCredential } from '_credentials/quotient';
import { createCreditScoreCredential } from '_credentials/equinet';
import { useLocalStorage } from 'hooks/hooks';
import { issueRevokableCredential } from 'utils/issue-crendentials';
import Head from 'next/head';
import userStore from 'store/appStore';
import qrCodeStore from 'store/qrCodeStore';
import LoadingModal from 'components/org/quotient/loading-modal';
import Header from 'components/org/quotient/Header';
import FormFieldNameAndBirthday from 'components/forms/form-field-id';
import FormFieldAddress from 'components/forms/form-field-address';
import FormFieldPersonalContact from 'components/forms/form-field-personal-contact';
import FormFieldGovId from 'components/forms/newAccount/form-field-govId';
import QuotientSuccess from 'components/org/quotient/quotient-success';
import DEFAULT_BANK_FORM_VALUES from 'data/bankFormValues';
import { getRandomNumber } from 'utils';

/**
 * @description Quotient Form to create new bank account.
 * @todo refactor this page by making code more modular
 * @returns React.FC page
 */
const QuotientBankForm = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCaptureCompleted, setIsCaptureCompleted] = useState(false);
  const [isUploadPoDComplete, setIsUploadPoDComplete] = useState(false);
  const proofTemplateId = PROOFT_TEMPLATES_IDS.BIOMETRIC_VERIFICATION;
  const verified = qrCodeStore((state) => state.verified);
  const setVerified = qrCodeStore((state) => state.setVerified);
  const retrievedData = qrCodeStore((state) => state.retrievedData);
  const receiverDid = userStore((state) => state.Did);
  const recipientEmail = userStore((state) => state.userEmail);

  const [revokableCredential, setRevokableCredential] = useLocalStorage('revokableCredential', '');

  const form = useForm({
    resolver: zodResolver(UserSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: DEFAULT_BANK_FORM_VALUES,
  });

  const credentialPayload = {
    receiverDid,
    recipientEmail,
    creditScore: getRandomNumber(700, 800)
  };

  const quotientPayload = () => ({
    receiverDid,
    recipientEmail,
    receiverName: `${form.getValues('firstName')} ${form.getValues('lastName')}`,
    receiverAddress: {
      address: form.getValues('streetAddress'),
      city: form.getValues('city'),
      zip: form.getValues('zipCode'),
      state: form.getValues('state'),
    },
    biometricData: getBiometricalData()
  });

  function getBiometricalData() {
    if (retrievedData !== null) {
      const credential = retrievedData.credentials.find((obj) => Object.prototype.hasOwnProperty.call(obj.credentialSubject, 'biometric'));
      if (credential) return credential.credentialSubject.biometric;
    }
    return null;
  }

  const createCredential = async (credential, payload, isRevocable) => {
    const credentialObj = credential(payload);
    await issueRevokableCredential(credentialObj.body, setRevokableCredential, isRevocable);
  };

  async function issueCredentials() {
    toast.info('Issuing Credentials.');
    const quotient_Payload = quotientPayload();

    console.log('quotient_Payload:', quotient_Payload);
    if (quotient_Payload.biometricData === null) {
      toast.error('Biometrical proof missing property biometrical data. Biometrical data is required to create new credentials.');
      return;
    }

    await createCredential(createBankIdCredential, quotient_Payload, false);
    await createCredential(createCreditScoreCredential, credentialPayload, true);

    toast.info('Credentials issued successfully.');
  }

  useEffect(() => () => {
    setVerified(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (verified === true) {
      console.log('issuing credentials...');
      setTimeout(() => {
        issueCredentials();
      }, 1000);
    }
    // eslint-disable-next-line
  }, [verified]);

  useEffect(() => {
    const [govId, webcamPic] = [form.getValues('govId'), form.getValues('webcamPic')];
    if (isCaptureCompleted && webcamPic === '') {
      form.resetField('webcamPic', { defaultValue: '/example_webcam.png' });
    }
    if (isUploadPoDComplete && govId === '') {
      form.resetField('govId', { defaultValue: '/example_passport.png' });
    }
  }, [isCaptureCompleted, isUploadPoDComplete, form]);

  async function onSubmit(values) {
    console.log('values', values);
    setIsLoading(true);
    toast.success('Bank account created, please proceed to next step.');

    setTimeout(() => {
      console.log('setters true');
      setIsSuccess(true);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <Head>
        <title>Quotient - Open New Bank Account</title>
      </Head>
      <Header />
      <LoadingModal isLoading={isLoading} setIsLoading={setIsLoading} />
      {isSuccess ? (
        <div className='mainContainer'>
          <QuotientSuccess
            title={'Your account has been opened!'}
            proofTemplateId={proofTemplateId} />
        </div>
      ) : (
        <div className='p-4 min-h-screen mainContainer'>
          <div className='mb-4 mt-2'>
            <h2 className='font-semibold text-2xl'>Open New Banking Account</h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex gap-4 flex-wrap'>
                <div className='flex-1 w-full xl:w-2/3 md:w-2/3 p-4 bg-neutral-50 rounded-lg space-y-5'>
                  <FormFieldNameAndBirthday control={form.control} dob={true} applicant={applicant} />
                  <Separator />
                  <FormFieldAddress control={form.control} applicant={applicant} />
                  <Separator />
                  <FormFieldPersonalContact control={form.control} isUsaCitizen={true} />
                </div>
                <div className='flex-2 w-full md:w-1/3 xl:w-1/3'>
                  <FormFieldGovId
                    control={form.control}
                    isSelfieCaptureCompleted={isCaptureCompleted}
                    setIsCaptureCompleted={setIsCaptureCompleted}
                    isDocumentCaptureComplete={isUploadPoDComplete}
                    setIsUploadPoDComplete={setIsUploadPoDComplete}
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
        </div>
      )}
    </>
  );
};

export default QuotientBankForm;
