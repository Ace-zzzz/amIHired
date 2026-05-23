import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ClickableSpan from "../components/ui/ClickableSpan";
import api from "../axios/api"
import { useState } from "react";
import userModalStore from '../hooks/useModalStore';
import EyeIcon from "../components/icons/EyeIcon";
import EyeSlashIcon from "../components/icons/EyeSlashIcon";
import useGoto from "../hooks/useGoto";

const Login = () => {
    // NAVIGATION HOOKS
    const { goToSignUp, goToDashboard } = useGoto();

    /**
     * GET THE onOPen PROPERTY
     * INSIDE userModalStore()
     **/ 
    const { onOpen } = userModalStore();

    /**
     * USED TO STORE 
     * username AND password VALUE
     **/
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    
    /**
     * USED TO STORE 
     * showPassword VALUE
     **/
    const [showPassword, setShowPassword] = useState(false);

    /**
     * TOGGLE PASSWORD VISIBILITY
     **/
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    } 

    /**
     * HANDLE THE LOGIN SUBMITION
     **/ 
    const handleSubmit =  async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/v1/users/login", {...user});

            const {message, success} = response.data;
            
            if (success) {
                localStorage.setItem("token", message);
                goToDashboard();
            }
            else 
                onOpen("error", "Something Went Wrong");

        } catch (error) {
            const errorMessage = error.response?.data || "Server Connection Failed";
            onOpen("error", errorMessage);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-br from-gray-50 to-gray-100">
            <div className="grid grid-cols-1 gap-y-6 shadow-2xl bg-white rounded-2xl p-8 w-full max-w-md animate-fade-in">
                <div className="flex flex-col items-center gap-4">
                    <img 
                        src="/images/ZombieingDoodle.svg" 
                        alt="AmIhired Logo" 
                        className="w-32 h-32 animate-float"
                    />
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hi, Welcome</h1>
                        <p className="text-gray-600 text-sm">Sign in to your account</p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} id="login-form" className="space-y-4 mt-2">
                    <Input 
                        type="text" 
                        placeholder="Username"
                        onChange={(e) => setUser({... user, username: e.target.value})}
                        required={true}
                    />
                    <div className="relative">
                        <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setUser({... user, password: e.target.value})}
                            required={true}
                        />
                        <button
                            onClick={handleShowPassword}
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {
                                showPassword ?
                                <EyeIcon />
                                :
                                <EyeSlashIcon />
                            }
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <ClickableSpan text="Forgot password?"/>
                    </div>
                </form>
                
                <Button 
                    text="Sign In" 
                    className="w-full mt-2" 
                    type="submit" 
                    form="login-form"
                />
                
                <div className="text-center text-sm text-gray-600 mt-2">
                    Don't have an account? <br />
                    <ClickableSpan text="Sign up" onClick={goToSignUp} />
                </div>
            </div>
        </div>
    )
}

export default Login;