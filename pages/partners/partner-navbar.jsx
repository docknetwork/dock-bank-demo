import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const PartnerNavbar = () => (

    <>
        <div className="partnerNavbar justify-left items-left ">
            <div className='flex max-w-screen-xl p-2 m-auto'>
                <div className='cursor-pointer mr-4'>
                    <Link href={'/partners'}>
                        <ChevronLeft className='text-white text-3xl' />
                    </Link>
                </div>
                <div>
                    <div>
                        <Image
                            src='/partnerswhite.png'
                            alt='partners-logo'
                            width={175}
                            height={28}
                        />
                    </div>
                </div>
            </div>
        </div>

    </>

);

export default PartnerNavbar;