import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import partners from 'data/partners'
import PartnerNavbar from './partner-navbar'

function validPartner(partner, partners) {
    if (!partner || partner.length < 2) return false
    return partners.find(p => p.id === partner)
}

export default function Page() {
    const router = useRouter()
    const partner = router.query.partner

    if (!validPartner(partner, partners)) return (
        <div className='p-10 ta-c'>
            <h1 className='text-3xl'>There is no page for this partner,
                <span className='text-blue-700 font-bold cursor-pointer ml-2'>
                    <Link href="/partners">go back
                    </Link>
                </span>
            </h1>
        </div>)

    const currentPartner = partners.find(p => p.id === partner)

    return (
        <div>
            <PartnerNavbar />
            <div>
                <h1>{currentPartner.name}</h1>
                <p>{currentPartner.description}</p>
                {currentPartner.links && currentPartner.links.length > 0 && (
                    <div>
                        {currentPartner.links.map(link => (
                            <Link key={link.title} href={link.url}>
                                <a>
                                    <button>{link.title}</button>
                                </a>
                            </Link>
                        ))}
                    </div>
                )}
                <Image src={currentPartner.logo} width={currentPartner.sizes[0]} height={currentPartner.sizes[1]} />
            </div>
        </div>
    )
}
