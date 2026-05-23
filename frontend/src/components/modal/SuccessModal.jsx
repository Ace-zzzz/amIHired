import useGoto from "../../hooks/useGoto";
import Button from '../ui/Button';

const SuccessModal = ({isOpen, onClose, data}) => {
    const { goToLogin } = useGoto();

    // NAVIGATE TO THE LOGIN PAGE
    const handleNavigate = () => {
        goToLogin();
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Modal */}
            <div className="animate-fade-in relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 text-center">
                    {/* Success Icon */}
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{data}</h2>

                    <Button text="Log in" onClick={handleNavigate} className='mt-4'/>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal;