import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/ui/form';
import Image from 'next/image';
import WebCamModal from './webcam-modal';

/**
 * @description Form Field for user web cam photo
 * @param {*} control  react hook form controller
 * @memberof FormFieldGovId
 * @returns React.FC Form Field
 */
const WebCamPhoto = ({ control, isCaptureCompleted, setIsCaptureCompleted }) => (
    <div className="p-4 bg-neutral-50 rounded-lg">
        <FormField
            control={control}
            name="webcamPic"
            render={({ field }) => (
                <FormItem className="relative h-full">
                    <div className='flex items-center justify-between'>
                        <div className='line-h-50'>
                            <FormLabel className="font-semibold">Take a webcam photo for KYC check</FormLabel>
                        </div>
                        <div>
                            <Image src="/id_clarity.png" alt='id_clarity' width={87} height={24} />
                        </div>
                    </div>
                    <FormControl>
                        {isCaptureCompleted ? (
                            <div className='grid place-items-center'>
                                <Image src="/example_webcam.png" alt='example_webcam' width={240} height={240} />
                            </div>
                        ) : (
                            <div className='grid justify-items-center gap-4'>
                                <Image src="/background_replace.png" alt='background_replace' width={224} height={224} />
                                <WebCamModal
                                    isCaptureCompleted={isCaptureCompleted}
                                    setIsCaptureCompleted={setIsCaptureCompleted}
                                />
                            </div>
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    </div>
);

export default WebCamPhoto;
