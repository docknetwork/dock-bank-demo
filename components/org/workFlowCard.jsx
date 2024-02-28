import Image from 'next/image';
import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';

export default function WorkFlowCard({ flow, arrow = false }) {
    return (
        <div className='mt-5 w-full '>
            <Link href={flow.url}>
                <div className='flowLogo flex justify-center cursor-pointer'>
                    <div><Image src={flow.logo} width={48} height={48} alt="orgLogo" /></div>
                    {flow.secondLogo && <div className='ml-2'><Image src={flow.secondLogo} width={48} height={48} alt="orgLogo" /></div>}
                </div>
            </Link>
            <Link href={flow.url}>
                <div className='relative'>
                    <div className='flowCard cursor-pointer' style={{ backgroundColor: `${flow.background}` }}>
                        <p>{flow.title}</p>
                    </div>
                    {arrow && (
                        <div className='absolute -right-8 bottom-4'>
                            <ChevronsRight className='text-urban hidden xl:block' />
                        </div>
                    )}
                </div>
            </Link>

        </div>

    );
}
