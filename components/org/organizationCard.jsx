import Image from 'next/image';
import Link from 'next/link';

export default function OrganizationCard({ org }) {
    return (
        <>
            <div className="cardImg valign-middle">
                <div>
                    <Image priority={true} src={org.logo} width={org.size[0]} height={org.size[1]} alt="orglogo" />
                </div>
            </div>
            <hr />
            <div className="pt-5 pb-5 min-h-32	">
                <p>
                    {org.description}
                </p>
            </div>

            <div className="cardBottom">

                {org.name === "Quotient" ? (
                    <>
                        <Link href={org.url}><button className='visitBtn '>
                            New Bank Account
                        </button></Link>
                        <br />
                        <Link href={org.url}><button className='visitBtn mt-5'>
                            Optain Auto Loan
                        </button></Link>
                    </>
                )
                    :
                    <Link href={org.url}><button className='visitBtn'>
                        Visit Site
                    </button></Link>
                }
            </div>
        </>
    );
}
