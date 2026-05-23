import { useNavigate } from "react-router-dom";

const useGoto = () => {
    const navigate = useNavigate();

    const goToLogin     = () => navigate('/login');
    const goToSignUp   = () => navigate('/sign-up');
    const goToDashboard = () => navigate('/dashboard');

    const goToLogout    = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    return { 
        goToLogin,
        goToSignUp,
        goToDashboard,
        goToLogout
    };
}

export default useGoto;