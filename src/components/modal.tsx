import { XMarkIcon } from '@heroicons/react/24/solid'
import { createPortal } from 'react-dom'

import { cn } from '@/libs/tw'

type ModalProps = {
    title: string
    children: JSX.Element
    isOpen: boolean
    onClose: () => void
}

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
    return (
        <>
            {isOpen &&
                createPortal(
                    <div className="h-screen w-screen bg-black/30 absolute top-0 p-6 md:p-8 text-white">
                        <div className="w-full h-full bg-blue-600 p-4 rounded-sm grid grid-rows-[max-content_1fr] gap-4">
                            <div className="w-full flex justify-between items-center">
                                <h3 className="text-2xl">{title}</h3>
                                <button
                                    aria-label="close modal"
                                    className="px-2 py-2"
                                    onClick={onClose}
                                >
                                    <XMarkIcon
                                        className={cn(
                                            'h-7 w-7, transition duration-300 md:hover:scale-125'
                                        )}
                                    />
                                </button>
                            </div>
                            {children}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )
}
