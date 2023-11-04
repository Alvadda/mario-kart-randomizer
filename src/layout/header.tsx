import { ArrowLeftCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { Link, useLocation } from 'wouter'

import { ROUTES } from '@/routes'

export const Header = () => {
    const [location] = useLocation()

    return (
        <header className="h-8 lg:h-10 w-full px-6 py-1 bg-blue-600 shadow-lg flex justify-between items-center">
            <div className="flex gap-2 justify-center">
                <img
                    src="/icon.png"
                    alt="Mario Kart 8 Deluxe Randomizer Logo"
                    className="h-6 lg:h-8"
                />
                <span className="flex items-center font-bold">Mario Kart 8 Deluxe Randomizer</span>
            </div>

            <div className="flex gap-4">
                {location === ROUTES.OPTIONS && (
                    <Link href={ROUTES.HOME}>
                        <Link href={ROUTES.OPTIONS}>
                            <ArrowLeftCircleIcon className="h-5 w-5 transition cursor-pointer duration-300 hover:scale-125" />
                        </Link>
                    </Link>
                )}
                {location === ROUTES.HOME && (
                    <Link href={ROUTES.OPTIONS}>
                        <Cog6ToothIcon className="h-5 w-5 transition cursor-pointer duration-300 hover:scale-125" />
                    </Link>
                )}
            </div>
        </header>
    )
}
