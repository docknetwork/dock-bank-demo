import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import partners from 'data/partners';
import PartnerNavbar from '../../components/partners/partner-navbar';
import PartnerContent from '../../components/partners/partnerContent';

function validPartner(partner, partners) {
  if (!partner || partner.length < 2) return false;
  return partners.find((p) => p.id === partner);
}

export default function Page() {
  const router = useRouter();
  const partner = router.query.partner;

  if (!validPartner(partner, partners)) {
    return (
      <div className="p-10 ta-c">
        <h1 className="text-3xl">
          There is no page for this partner,
          <span className="text-blue-700 font-bold cursor-pointer ml-2">
            <Link href="/partners">go back</Link>
          </span>
        </h1>
      </div>
    );
  }

  const currentPartner = partners.find((p) => p.id === partner);

  return (
    <div>
      <PartnerNavbar />
      <div className="max-w-screen-xl p-2 pt-10 m-auto">
        <h1 className="text-2xl font-semibold mb-8 text-purple">{currentPartner.name}</h1>
        <div className="block lg:flex lg:p-0 md:block sm:block sm:p-5 gap-8 partnerContainer">
          <div className="lg:p-0 flex-2 md:p-5 ta-c">
            <div className="bgImg ta-l">
              <div className="overlay">
                <Image
                  src={currentPartner.logo}
                  width={currentPartner.sizes[0]}
                  height={currentPartner.sizes[1]}
                  alt="partnerlogo"
                />
              </div>
            </div>
          </div>

          <div className="relative p-5 lg:p-0 flex-2 md:p-5 sm:p-5">
            <PartnerContent currentPartner={currentPartner} />
          </div>
        </div>
      </div>
    </div>
  );
}
