import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/libs/tw'

type ButtonProps = {
    icon?: JSX.Element
    round?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ icon, round = true, className, children, ...rest }: ButtonProps) => {
    return (
        <button
            className={cn(
                className,
                'py-1 px-2 md:py-2 md:px-4 bg-black/50  disabled:bg-black/30',
                'flex gap-2 md:gap-4  justify-center items-center',
                'transition duration-300',
                round && 'rounded-sm'
            )}
            {...rest}
        >
            {icon && icon}
            {children}
        </button>
    )
}
