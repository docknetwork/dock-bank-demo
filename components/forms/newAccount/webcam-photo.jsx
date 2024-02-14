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
    <div className="p-4 bg-neutral-50 rounded-lg h-50">
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
                            <div className='grid place-items-center pt-12'>
                                <Image src="/example_webcam.png" alt='webcam_oval' width={225} height={260} />
                            </div>
                        ) : (
                            <div className='grid justify-items-center gap-4 pt-16'>
                                <Image src="/background_replace.png" alt='background_replace' width={168} height={168} />
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
