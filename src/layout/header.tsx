import { ROUTES } from '@/routes'
import { Link } from 'wouter'

export const Header = () => {
    return (
        <header className="h-8 lg:h-10 w-full px-6 py-1 bg-blue-600 shadow-lg flex justify-between items-center">
            <span>MK Randomizer</span>
            <div className="flex gap-4">
                <Link href={ROUTES.HOME}>Home</Link>
                <Link href={ROUTES.RANDOM}>Randomizer</Link>
                <Link href={ROUTES.OPTIONS}>Options</Link>
            </div>
        </header>
    )
}
