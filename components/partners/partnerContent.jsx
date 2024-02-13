import Link from 'next/link';
import { Button } from 'components/ui/button';

const PartnerContent = ({ currentPartner }) => (
    <>
        {currentPartner?.subtitle && <div>
            <p className='text-2xl font-semibold mb-4'>{currentPartner.subtitle}</p>
        </div>}
        <div>
            <p className='text-sm font-semibold'>{currentPartner?.description}</p>
        </div>

        {currentPartner.paragraph !== undefined && <div className='mt-5 text-sm'>
            <p className='text-sm font-semibold'>{currentPartner.paragraph}</p>
        </div>}

        {currentPartner.links && currentPartner.links.length > 0 && (
            <div className='flex mt-5 gap-4'>
                {currentPartner.links?.map((link) => (
                    <div key={link.title}>
                        {link.url !== undefined ? (
                            <div>
                                <Link href={link.url}>
                                    <a>
                                        <Button className='partnerBtn' variant="outline">{link.title}</Button>
                                    </a>
                                </Link></div>
                        ) : (
                            <div><Button className='partnerBtn' variant="outline">{link.title}</Button></div>
                        )}
                    </div>
                ))}
            </div>
        )}
    </>
);

export default PartnerContent;
