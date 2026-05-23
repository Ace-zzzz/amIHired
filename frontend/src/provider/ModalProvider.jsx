import useModalStore from "../hooks/useModalStore"
import JobModal from '../components/modal/JobModal'
import ErrorModal from '../components/modal/ErrorModal'
import SuccessModal from '../components/modal/SuccessModal'
import DeleteModal from "../components/modal/DeleteModal"

const ModalProvider = () => {
    const { type, isOpen, onClose, data } = useModalStore();

    if (!isOpen) return null;

    return (
        <>
            {type === "createJob" && <JobModal  {...{isOpen, onClose, data}} />}
            {type === "error" && <ErrorModal {...{isOpen, onClose, data}} />}
            {type === "success" && <SuccessModal {...{isOpen, onClose, data}} />}
            {type === "delete" && <DeleteModal {...{isOpen, onClose, data}} />}
        </>
    )
}

export default ModalProvider;