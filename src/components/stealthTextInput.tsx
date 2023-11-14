import { InputHTMLAttributes } from 'react'

import { cn } from '@/libs/tw'

// eslint-disable-next-line no-empty-pattern

export const StealthTextInput = ({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            type="text"
            className={cn('bg-transparent border-none outline-none font-bold w-full', className)}
            {...rest}
        />
    )
}
