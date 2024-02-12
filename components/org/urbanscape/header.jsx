import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @description Urbanscape header comp
 * @memberof UrbanScapePage, UrbanScapeSuccess
 * @returns React.FC 
 */
const Header = () => (
    <div className="p-4 bg-green-900 flex justify-between items-center">
        <div className='flex items-center'>
            <div className='mr-4 cursor-pointer'>
                <Link href={'/'}>
                    <ChevronLeft className='text-white text-2xl' />
                </Link>
            </div>
            <Image
                src='/urbanscape.png'
                alt='urbanscape-logo'
                width={100}
                height={120}
            />

        </div>
        <Image
            src='/clarity.png'
            alt='clarity-logo'
            width={69}
            height={40}
        />
    </div>
);

export default Header;
