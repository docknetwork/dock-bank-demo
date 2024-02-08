import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @description Quotient header comp
 * @memberof QuotientBankForm, QuotientApplyLoanForm
 * @returns React.FC 
 */
const Header = () => (
    <div className="p-4 bg-blue-900 flex justify-center items-center">
        <div className='absolute left-5 cursor-pointer'>
            <Link href={'/'}>
                <FontAwesomeIcon className='text-white text-2xl' icon={faChevronLeft} />
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
