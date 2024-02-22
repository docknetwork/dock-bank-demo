import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent
} from 'components/ui/dialog';

/**
 * @description Quotient modal for loading while issuing credentials
 * @param {*} isLoading controls opening of dialog  
 * @memberof QuotientBankForm 
 * @returns React.FC Dialog
 */
const LoadingModal = ({ isLoading }) => (
    <Dialog open={isLoading}>
        <DialogContent>
            <div className='grid justify-items-center gap-2 p-5'>
                <Image src="/docklogo.png" alt='id_clarity' width={168} height={64} />
                <h2 className='text-center text-lg'>Issuing Credentials to your Dock Mobile Wallet App</h2>
                <Loader2 className="h-24 w-24 animate-spin text-blue-400" />
            </div>
        </DialogContent>
    </Dialog>
);

export default LoadingModal;
