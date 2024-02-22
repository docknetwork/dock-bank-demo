import Image from 'next/image';
import Link from 'next/link';

const PartnerCard = ({ partner }) => (
        <div className='partnerCard cursor-pointer rounded-sm' style={{ backgroundColor: `${partner?.background}` }}>
            <Link href={partner.url}>
                <div>
                    <Image src={partner.logo} width={partner.sizes[0]} height={partner.sizes[1]} alt="partnerLogo" />
                </div>
            </Link>
            <Link href={partner.url}>
                <div className="mt-5">
                    <p className="text-white font-semibold">
                        {partner.short ? partner.short : partner.description}
                    </p>
                </div>
            </Link>
        </div>
    );

export default PartnerCard;
