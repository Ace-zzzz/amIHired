const ErrorModal = ({isOpen, onClose, data}) => {
    // CONVERTS DATA INTO ARRAY
    const errorMessages = typeof data === 'object' 
    ? Object.values(data) 
    : [data];
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Backdrop */}
            <div 
                className="absolute inset-0"
            ></div>

            {/* Modal */}
            <div className="animate-fade-in relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4  sm:max-w-lg">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-red-500">
                            <ul className="list-disc list-inside space-y-2 mb-6">
                                {errorMessages.map((message, index) => (
                                    <li key={index}  className="text-red-600 text-sm">
                                        {message}
                                    </li>
                                ))}
                            </ul>
                        </h2>
                        <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
                        >
                        &times;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal;