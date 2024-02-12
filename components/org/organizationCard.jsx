import Image from 'next/image';
import Link from 'next/link';

export default function OrganizationCard({ org }) {
    return (
        <>
            <div className='cardImg valign-middle'>
                <div>
                    <Image priority={true} src={org.logo} width={org.size[0]} height={org.size[1]} alt='orglogo' />
                </div>
            </div>
            <hr />
            <div className='pt-5 min-h-28'>
                <p className='text-sm'>
                    {org.description}
                </p>
            </div>

            <div className='cardBottom'>
                {org.name === 'Quotient' ? (
                    <>
                        <div>
                            <Link href={org.url}>
                                <button className='visitBtn'>
                                    New Bank Account
                                </button>
                            </Link>
                        </div>
                        <div className='mt-2'>
                            <Link href={'/org/quotient/loan'}>
                                <button className='visitBtn'>
                                    Obtain Auto Loan
                                </button>
                            </Link>
                        </div>
                    </>
                ) : (
                    org.button && org.button === true && (
                        <Link href={org.url}>
                            <button className='visitBtn'>
                                Visit Site
                            </button>
                        </Link>
                    )
                )}
            </div>

        </>
    );
}
