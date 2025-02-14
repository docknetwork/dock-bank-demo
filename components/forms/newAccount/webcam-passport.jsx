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
const WebCamPassport = ({ control, isCaptureCompleted, setIsCaptureCompleted, gif, capturedImage, placeholder, buttonTxt }) => (
    <div className="p-4 bg-neutral-50 rounded-lg h-80 xl:h-3/6">
        <FormField
            control={control}
            name="govId"
            render={({ field }) => (
                <FormItem className="relative h-full">
                    <div className='flex items-center justify-between'>
                        <div>
                            <FormLabel className="font-semibold">Upload Passport or Drivers License</FormLabel>
                        </div>
                        <div>
                            <Image src="/DaonLogo-FullColor.png" alt='id_clarity' width={87} height={24} />
                        </div>
                    </div>
                    <FormControl>
                        {isCaptureCompleted ? (
                            <div className='grid justify-items-center gap-4 pt-2 xl:pt-16 '>
                                <Image src={capturedImage} alt='webcam_oval' width={259} height={180} />
                            </div>
                        ) : (
                            <div className='grid justify-items-center gap-4 pt-2 xl:pt-16'>
                                <Image src={placeholder} alt='background_replace' width={149} height={186} />
                                <WebCamModal
                                    isCaptureCompleted={isCaptureCompleted}
                                    setIsCaptureCompleted={setIsCaptureCompleted}
                                    gif={gif}
                                    buttonTxt={buttonTxt}
                                />
                            </div>
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    </div>
);

export default WebCamPassport;
