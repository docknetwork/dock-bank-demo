import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from 'lib/zodSchemas';
import { issueCredentials } from 'utils/credentialsUtils';
import { toast } from 'sonner';
import userStore from 'store/appStore';
import LoadingModal from 'components/org/quotient/loading-modal';
import Header from 'components/org/quotient/Header';
import { Form } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import FormFieldNameAndBirthday from 'components/forms/user/form-field-id';
import FormFieldAddress from 'components/forms/user/form-field-address';
import FormFieldPersonalContact from 'components/forms/user/form-field-personal-contact';
import FormFieldGovId from 'components/forms/user/newAccount/form-field-govId';
import QuotientSuccess from 'components/org/quotient/quotient-success';

const DEFAULT_FORM_VALUES = {
  firstName: 'ken',
  middleName: 'zambrano',
  lastName: 'de jesus',
  suffix: 'He',
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
  webcamPic: '',
};

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
  const receiverDid = userStore((state) => state.Did);
  const setIsHelperOpen = userStore((state) => state.setIsHelperOpen);

  const form = useForm({
    resolver: zodResolver(UserSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    // fetch the form values for images (should be empty at start)
    const [govId, webcamPic] = [form.getValues('govId'), form.getValues('webcamPic')];
    // if interacted with web cam component, will set the mocked values
    if (isCaptureCompleted && webcamPic === '') form.resetField('webcamPic', { defaultValue: '/example_webcam.png' });
    // if govId has been 'uploaded', set the mocked values
    if (isUploadPoDComplete && govId === '') form.resetField('govId', { defaultValue: '/example_passport.png' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCaptureCompleted, isUploadPoDComplete, form]);

  // once form values are valid, do something
  async function onSubmit(values) {
    console.log('values', values);
    // eslint-disable-next-line no-promise-executor-return
    if (!receiverDid || receiverDid.length < 3) {
      toast.info('Please add your Did and email in the helper box');
      setIsHelperOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      toast.info('Form submitted, issuing credentials');
      const result = await issueCredentials(receiverDid, setIsLoading, setIsSuccess);
      toast.promise(result, {
        success: 'Credentials as been successfully created',
        error: 'Something went wrong while issuing credentials, try again or contact support',
      });
      console.log('results:', result);
    } catch (error) {
      setIsLoading(false);
      console.log('issuing error: ', error);
    }
  }

  return (
    <>
      <Head>
        <title>Quotient - Open New Bank Account</title>
      </Head>
      <Header />
      <LoadingModal isLoading={isLoading} setIsLoading={setIsLoading} />
      {isSuccess ? (
        <QuotientSuccess title="Your account has been opened!" />
      ) : (
        <div className="p-4 min-h-screen mainContainer">
          <div className="mb-4 mt-2">
            <h2 className="font-semibold text-2xl">Open New Banking Account</h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-2">
              <div className="p-4 bg-neutral-50 rounded-lg space-y-5">
                <FormFieldNameAndBirthday control={form.control} dob={true} />
                <Separator />
                <FormFieldAddress control={form.control} />
                <Separator />
                <FormFieldPersonalContact control={form.control} />
              </div>
              <FormFieldGovId
                control={form.control}
                isCaptureCompleted={isCaptureCompleted}
                setIsCaptureCompleted={setIsCaptureCompleted}
                setIsUploadPoDComplete={setIsUploadPoDComplete}
              />
              <Button
                className="col-span-2 w-fit md:place-self-end px-10 bg-emerald-700 text-lg"
                type="submit">
                Submit Application
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default QuotientBankForm;
