import { cn } from 'utils';
import { Button } from 'components/ui/button';
import { CircleUserRound, LogOut } from 'lucide-react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

/**
 * @description Equinet sidebar menu.
 * @param {*} className custom style
 * @returns React.FC Sidebar
 */
export function Sidebar({ className }) {
    return (
        <div className={cn('pb-6 equinetBg w-full', className)}>
            <div className="h-full flex flex-col justify-between py-4 text-white">
                <div>
                    <div className='p-2'>
                        <Image src="/equinetlogo.png" width={256} height={40} alt='equinetlogo' />
                    </div>
                    <div className="px-3 py-2">
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Dashboard
                            </Button>
                            <Button variant="gost" className="w-full justify-start rounded-full activeItem w-full">
                                Users <span className='ta-r w-full'><ChevronDown /></span>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Scores
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Designer
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Verification
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Organization profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Ecosystem
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Activities
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-full">
                                Plan and billing
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center">
                        <div className='flex space-x-2 items-center'>
                            <CircleUserRound />
                            <p>John Doe</p>
                        </div>
                        <Link href="/">
                            <Button variant="ghost" className='rounded-full'>
                                <LogOut />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
