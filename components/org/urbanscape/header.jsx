import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @description Urbanscape header comp
 * @memberof UrbanScapePage, UrbanScapeSuccess
 * @returns React.FC 
 */
const Header = () => (
    <div className="p-4 urbanHeader flex justify-between items-center relative">
        <div className='flex items-center'>
            <div className='mr-4 cursor-pointer'>
                <Link href={'/'}>
                    <ChevronLeft className='text-white text-2xl' />
                </Link>
            </div>
            <Image
                src='/urbanwhite.png'
                alt='urbanscape-logo'
                width={162}
                height={140}
            />

        </div>
        <div className='absolute right-10 bottom-5'>
            <Image
                src='/partnersgrey.png'
                alt='partnersgrey'
                width={176}
                height={28}
            />
        </div>
    </div>
);

export default Header;
