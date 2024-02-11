import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const PartnerNavbar = () => (

    <>
        <div className="partnerNavbar justify-left items-left ">
            <div className='max-w-screen-xl p-2 m-auto'>
                <div className='absolute left-5 top-5 cursor-pointer'>
                    <Link href={'/partners'}>
                        <ChevronLeft className='text-white text-3xl' />
                    </Link>
                </div>
                <div>
                    <div className='mb-5 mt-5'>
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