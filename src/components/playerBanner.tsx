import { cn } from '@/libs/tw'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

type PlayerBannerProps = {
    name: string
    spin: () => void
    isSpinning: boolean
}

export const PlayerBanner = ({ name, spin, isSpinning }: PlayerBannerProps) => {
    return (
        <div className="flex h-8">
            <PlayerBannerFlag flip />
            <div className="h-full w-full bg-black/50 text-white px-4 flex items-center justify-between capitalize">
                <span>{name}</span>
                <button
                    className="px-2 py-4 disabled:opacity-50"
                    onClick={spin}
                    disabled={isSpinning}
                >
                    <ArrowPathIcon
                        className={cn('h-6 w-6', {
                            'animate-spin': isSpinning,
                        })}
                    />
                </button>
            </div>
            <PlayerBannerFlag />
        </div>
    )
}

const PlayerBannerFlag = ({ flip = false }: { flip?: boolean }) => {
    return (
        <div
            className={`grid grid-rows-4 grid-cols-4 h-full aspect-square  ${
                flip ? 'rotate-180' : ''
            }`}
        >
            <div className="bg-black opacity-50" />
            <div className="bg-black opacity-0" />
            <div className="bg-black opacity-25" />
            <div className="bg-black opacity-0" />

            <div className="bg-black opacity-0" />
            <div className="bg-black opacity-40" />
            <div className="bg-black opacity-0" />
            <div className="bg-black opacity-10" />

            <div className="bg-black opacity-50" />
            <div className="bg-black opacity-0" />
            <div className="bg-black opacity-25" />
            <div className="bg-black opacity-0" />

            <div className="bg-black opacity-0" />
            <div className="bg-black opacity-40" />
            <div className="bg-black opacity-0" />
            <div className="bg-black opacity-10" />
        </div>
    )
}
