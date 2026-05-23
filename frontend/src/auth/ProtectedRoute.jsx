import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // GET TOKEN
    const token = localStorage.getItem("token");

    /**
     * REDIRECT TO 
     * LOGIN PAGE IF
     * NO TOKEN STORED 
     **/
    if (!token) return <Navigate to={"/login"} replace/>

    return <Outlet/>
}

export  default ProtectedRoute;