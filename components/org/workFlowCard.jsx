import Image from 'next/image';
import Link from 'next/link';

export default function WorkFlowCard({ flow }) {
    return (
        <div>

            <Link href={flow.url}>
                <div className='flowLogo flex justify-center cursor-pointer'>
                    <div><Image src={flow.logo} width={48} height={48} alt="orgLogo" /></div>
                    {flow.secondLogo && <div className='ml-2'><Image src={flow.secondLogo} width={48} height={48} alt="orgLogo" /></div>}
                </div>
            </Link>
            <Link href={flow.url}>
                <div className='flowCard cursor-pointer' style={{ backgroundColor: `${flow.background}` }}>
                    <p>{flow.title}</p>
                </div>
            </Link>
        </div>

    );
}
