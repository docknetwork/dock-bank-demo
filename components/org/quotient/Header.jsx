import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

/**
 * @description Quotient header comp
 * @memberof QuotientBankForm, QuotientApplyLoanForm
 * @returns React.FC 
 */
const Header = () => (
    <div className="p-4 bg-blue-900 flex justify-center items-center">
        <div className='absolute left-5 cursor-pointer'>
            <Link href={'/'}>
                <ChevronLeft className='text-white text-3xl' />
            </Link>
        </div>
        <Image
            className=''
            src='/quotient.png'
            alt='quotient-logo'
            width={169}
            height={40}
        />
    </div>
);

export default Header;
