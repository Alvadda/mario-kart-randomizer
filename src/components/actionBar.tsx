import { cn } from '@/libs/tw'

type ActionBarProps = {
    actions: {
        name: string
        action: () => void
    }[]
}

export const ActionBar = ({ actions }: ActionBarProps) => {
    return (
        <div className="w-full h-8 bg-black/50 border border-transparent rounded-bl-xl rounded-br-xl overflow-hidden flex">
            {actions.map((action) => (
                <div
                    key={action.name}
                    className={cn(
                        'h-full w-full cursor-pointer font-bold',
                        'flex justify-center items-center border-r last-of-type:border-none capitalize',
                        'hover:bg-black/60'
                    )}
                    onClick={action.action}
                    role="button"
                >
                    {action.name}
                </div>
            ))}
        </div>
    )
}
