import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoute = () => {
    // GET TOKEN
    const token = localStorage.getItem("token");

    /**
     * REDIRECT TO 
     * DASHBOARD IF
     * THERE'S TOKEN STORED 
     **/
    if (token) return <Navigate to={"/dashboard"} replace/>

    return <Outlet/>
}

export default UnprotectedRoute;