export const Flag = ({ flip = false }: { flip?: boolean }) => {
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
