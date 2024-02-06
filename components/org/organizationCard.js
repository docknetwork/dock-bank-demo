import Image from "next/image"
import Link from "next/link"

export default function OrganizationCard({ org }) {
    if (!org || org === undefined) return

    return (
        <div className='orgCard'>

            <div className="cardImg valign-middle">
                <div>
                    <Image src={org.logo} width={org.size[0]} height={org.size[1]} />
                </div>
            </div>

            <hr />
            <div className="pt-5 pb-5">
                <p>
                    {org.description}
                </p>
            </div>

            <div className="cardBottom">
                <Link href={org.url}><button className='visitBtn'>
                    Visit Site
                </button></Link>
            </div>
        </div>
    )
}
