function Modal({isOpen,children,footer,title}){
    if (!isOpen) return null;

    return(
        <>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                ></div>

                {/* Centering wrapper */}
                <div className="flex items-center justify-center min-h-screen px-4 text-center">
                    {/* Modal content */}
                    <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        {/* Header */}
                        {title && (
                            <div className="px-4 py-3 border-b">
                                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                            </div>
                        )}

                        {/* Body */}
                        <div className="px-4 py-5">{children}</div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2">
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Modal;
