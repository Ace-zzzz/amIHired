import Button from '../ui/Button';
import api from '../../axios/api';
import { toast } from "react-toastify";

const DeleteModal = ({ isOpen, onClose, data }) => {

    // DELETE JOB
    const deleteJob = async () => {
        try {
            // SEND REQUEST TO THE SERVER TO DELETE A JOB
            await api.delete(`/v1/job-application/jobs/${data.id}`); 
            
            // RE-FETCH JOB TO THE DASHBOARD
            data?.callback.setJobDeleted(); 
            
            // SHOW TOAST
            toast.success("Successfully Deleted");
        }
        catch (error) {
            // GET ERROR MESSAGE
            const errorMessage = error?.response?.data || "Something went wrong";

            // SHOW TOAST
            toast.error(errorMessage);
        }
    }
    
    // HANDLE JOB DELETION PROCESS
    const handleConfirm = async () => {
        await deleteJob();
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="animate-fade-in relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4">
                <div className="p-8 flex flex-col items-center text-center">

                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-5">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Delete Application
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        Are you sure you want to delete
                        {data
                            ? <span className="font-semibold text-gray-700"> "{ data.title }"</span>
                            : ' this job application'
                        }?
                        <br />
                        This action <span className="font-semibold text-red-500">cannot be undone</span>.
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 w-full">
                        <Button
                            text="Cancel"
                            primary={false}
                            onClick={onClose}
                            className="flex-1"
                        />
                        <Button
                            text="Delete"
                            onClick={ handleConfirm }
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-red-300/40 hover:shadow-red-400/40"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DeleteModal;