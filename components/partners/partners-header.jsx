import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Separator } from 'components/ui/separator';

const PartnersHeader = () => (

    <>
        <div className="partnersHeader justify-left items-left ">
            <div className='max-w-screen-xl p-2 m-auto'>
                <div className='absolute left-5 top-5 cursor-pointer'>
                    <Link href={'/'}>
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
                <Separator className='bg-purple' />
                <div className='mt-5'>
                    <h1 className='font-semibold text-2xl text-white'>
                        Welcome to the Identity Clarity ecosystem clarity partners.
                    </h1>
                </div>
                <div className='mt-5'>
                    <p className='font-light text-lg text-white'>
                        Join the privacy conscious ecosystem of partners providing valuable
                        services to all of our members.
                    </p>
                </div>
            </div>
        </div>

    </>

);

export default PartnersHeader;
