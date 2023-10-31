import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/libs/tw'

type ButtonProps = {
    icon?: JSX.Element
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ icon, className, children, ...rest }: ButtonProps) => {
    return (
        <button
            className={cn(
                className,
                'py-2 px-4 bg-black/50  disabled:bg-black/30 rounded-sm',
                'flex gap-4 justify-center items-center',
                'transition duration-300'
            )}
            {...rest}
        >
            {icon && icon}
            {children}
        </button>
    )
}
