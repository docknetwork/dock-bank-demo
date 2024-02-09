import { cn } from 'utils';
import { Button } from 'components/ui/button';
import { CircleUserRound, LogOut } from 'lucide-react';

/**
 * @description Equinet sidebar menu.
 * @param {*} className custom style
 * @returns React.FC Sidebar
 */
export function Sidebar({ className }) {
    return (
        <div className={cn('pb-6 bg-sky-800 w-full', className)}>
            <div className="h-full flex flex-col justify-between py-4 text-white">
                <div>
                    <div className='p-2'>
                        EQUINET LOGO HERE
                    </div>
                    <div className="px-3 py-2">
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start">
                                Dashboard
                            </Button>
                            <Button variant="secondary" className="w-full justify-start">
                                Users
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                Scores
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                Designer
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                Verification
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                Organization profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                Ecosystem
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                Activities
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                Plan and billing
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center">
                        <div className='flex space-x-2 items-center'>
                            <CircleUserRound />
                            <p>Sam Donaldson</p>
                        </div>
                        <Button variant="ghost" className='rounded-full'>
                            <LogOut />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
