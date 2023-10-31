type IconButtonProps = {
    prop: type
}

export const IconButton = ({ prop }: IconButtonProps) => {
    return (
        <button aria-label="randomize" className="px-2 py-2" onClick={spin} disabled={isSpinning}>
            <ArrowPathIcon
                className={cn(
                    'h-5 w-5, transition duration-300',
                    isSpinning ? 'animate-spin opacity-50' : 'md:hover:scale-125'
                )}
            />
        </button>
    )
}
