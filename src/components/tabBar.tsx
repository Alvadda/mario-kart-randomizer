import { cn } from '@/libs/tw'

type TabBarProps<T extends string> = {
    options: T[]
    onSelect: (category: T) => void
    active: T
}

export const TabBar = <T extends string>({ options, active, onSelect }: TabBarProps<T>) => {
    return (
        <div className="w-full h-8 bg-black/40 border border-transparent rounded-tl-xl rounded-tr-xl overflow-hidden flex">
            {options.map((option) => (
                <div
                    className={cn(
                        'h-full w-full cursor-pointer',
                        'flex justify-center items-center border-r last-of-type:border-none capitalize',
                        active === option ? 'bg-black/60' : 'hover:bg-black/50'
                    )}
                    onClick={() => onSelect(option)}
                >
                    {option}
                </div>
            ))}
        </div>
    )
}
