import { ArrowLeftCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { Link, useLocation } from 'wouter'

import { ROUTES } from '@/routes'

export const Header = () => {
    const [location] = useLocation()

    return (
        <header className="h-12 lg:h-14 w-full px-4 py-1 bg-blue-600 shadow-lg flex items-center">
            <div className="w-full flex gap-2 justify-center">
                <img
                    src="/icon.png"
                    alt="Mario Kart 8 Deluxe Randomizer Logo"
                    className="h-6 lg:h-8"
                />
                <span className="w-full flex items-center font-bold">
                    Mario Kart 8 Deluxe Randomizer
                </span>
            </div>

            <div className="flex gap-4">
                {location === ROUTES.OPTIONS && (
                    <Link href={ROUTES.HOME}>
                        <Link href={ROUTES.OPTIONS}>
                            <ArrowLeftCircleIcon className="h-7 w-7 transition cursor-pointer duration-300 sm:hover:scale-125" />
                        </Link>
                    </Link>
                )}
                {location === ROUTES.HOME && (
                    <Link href={ROUTES.OPTIONS}>
                        <Cog6ToothIcon className="h-7 w-7 transition cursor-pointer duration-300 sm:hover:scale-125" />
                    </Link>
                )}
            </div>
        </header>
    )
}
