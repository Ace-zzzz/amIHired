import { useEffect, useState } from "react";
import api from '../axios/api';

const useAuth = () => {
    // USER MANAGEMENT STATE
    const [ user, setUser ] = useState(null);

    // LOADING MANAGEMENT STATE
    const [ isLoading, setLoading ] = useState(true);

    // FETCH USER PROFILE (EMAIL AND USERNAME ONLY)
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get("/v1/users/me");

                setUser(response.data);
            }
            catch (error) {
                console.error(error.response?.data);
            }
            finally {
                setLoading(false)
            }
        };

        fetchUserProfile();

    },[]);
    
    return {user, isLoading };
}

export default useAuth;