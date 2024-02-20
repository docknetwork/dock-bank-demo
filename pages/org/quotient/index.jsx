import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from 'lib/zodSchemas';
import { toast } from 'sonner';
import { Form } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { PROOFT_TEMPLATES_IDS } from 'utils/constants';
import { createBiometricsCredential } from '_credentials/forsur';
import { createBankIdCredential } from '_credentials/quotient';
import { createCreditScoreCredential } from '_credentials/equinet';
import { useLocalStorage } from 'utils/hooks';
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

/**
 * @description Quotient Form to create new bank account.
 * @todo refactor this page by making code more modular
 * @returns React.FC page
 */
const QuotientBankForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCaptureCompleted, setIsCaptureCompleted] = useState(false);
  const [isUploadPoDComplete, setIsUploadPoDComplete] = useState(false);
  const proofTemplateId = PROOFT_TEMPLATES_IDS.FORSUR_BIOMETRICS;
  const verified = qrCodeStore((state) => state.verified);
  const receiverDid = userStore((state) => state.Did);
  const recipientEmail = userStore((state) => state.userEmail);

  const [revokableCredential, setRevokableCredential] = useLocalStorage('revokableCredential', '');

  const credentialPayload = {
    receiverDid,
    recipientEmail,
  };

  const quotientPayload = {
    receiverDid,
    recipientEmail,
    receiverName: 'Jhon Smith',
    receiverAddress: 'Central park 102'
  };

  const createCredential = async (credential, payload) => {
    const credentialObj = credential(payload);
    await issueRevokableCredential(credentialObj.body, setRevokableCredential);
  };

  async function issueCredentials() {
    toast.info('Issuing Credentials.');
    await Promise.all([
      createCredential(createBiometricsCredential, credentialPayload),
      createCredential(createBankIdCredential, quotientPayload),
      createCredential(createCreditScoreCredential, credentialPayload),
    ]);
    toast.info('Credentials issued successfully.');
  }

  const form = useForm({
    resolver: zodResolver(UserSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: DEFAULT_BANK_FORM_VALUES,
  });

  useEffect(() => {
    if (verified === true) {
      console.log('issuing credentials');
      issueCredentials();
    }
    // eslint-disable-next-line
  }, [verified]);

  useEffect(() => {
    const [govId, webcamPic] = [form.getValues('govId'), form.getValues('webcamPic')];

    if (isCaptureCompleted && webcamPic === '') form.resetField('webcamPic', { defaultValue: '/example_webcam.png' });
    if (isUploadPoDComplete && govId === '') form.resetField('govId', { defaultValue: '/example_passport.png' });
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
          <QuotientSuccess title='Your account has been opened!' proofTemplateId={proofTemplateId} />
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
                  <FormFieldNameAndBirthday control={form.control} dob={true} />
                  <Separator />
                  <FormFieldAddress control={form.control} />
                  <Separator />
                  <FormFieldPersonalContact control={form.control} isUsaCitizen={true} />
                </div>
                <div className='flex-2 w-full md:w-1/3 xl:w-1/3'>
                  <FormFieldGovId
                    control={form.control}
                    isCaptureCompleted={isCaptureCompleted}
                    setIsCaptureCompleted={setIsCaptureCompleted}
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
