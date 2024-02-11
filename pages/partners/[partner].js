import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from 'components/ui/button'
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
            <div className='max-w-screen-xl p-2 pt-10 m-auto'>
                <h1 className='text-2xl font-semibold mb-8'>{currentPartner.name}</h1>
                <div className='flex gap-8 '>

                    <div>
                        <div className='bgImg'>
                            <div className='overlay'>
                                <Image src={currentPartner.logo} width={currentPartner.sizes[0]} height={currentPartner.sizes[1]} alt="partnerlogo" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className='text-2xl font-semibold'>{currentPartner.description}</p>
                        {currentPartner.links && currentPartner.links.length > 0 && (
                            <div className='flex gap-2'>
                                {currentPartner.links.map(link => (
                                    <div key={link.title}>
                                        {link.url ? (
                                            <Link href={link.url}>
                                                <a>
                                                    <Button>{link.title}</Button>
                                                </a>
                                            </Link>
                                        ) : (
                                            <Button>{link.title}</Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
