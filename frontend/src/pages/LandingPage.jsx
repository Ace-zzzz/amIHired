import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import CheckMark from "../components/ui/CheckMark";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    }
    
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-yellow-50/40 to-yellow-100/30 flex items-center justify-center px-4 py-12">
            <div className="max-w-7xl w-full">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
                    <div className="max-w-2xl space-y-6 animate-fade-in">
                        <div className="inline-block">
                            <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-4 py-2 rounded-full">
                                🚀 Your Career Companion
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Build your
                            <span className="text-yellow-500 relative">
                                <span className="relative z-10"> Future</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-300/40 z-0"></span>
                            </span>,
                            <br/>
                            Track applications
                            <br/>
                            <span className="bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                without the overwhelm
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                            Manage your job applications, track interviews, and land your dream job with confidence and clarity.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                                onClick={handleGetStarted}
                                type="button"
                                text="Get Started for Free" 
                                className="transform hover:scale-105 transition-all duration-200"
                                primary={true}/>
                            <Button 
                                type="button"
                                text="View Source Code" 
                                className="transform hover:scale-105 transition-all duration-200"
                                primary={false}/>
                        </div>

                        <div className="flex items-center gap-8 pt-6 text-sm text-gray-500">
                            <CheckMark text="No credit card required"/>
                            <CheckMark text="Free forever"/>
                        </div>
                    </div>

                    <div className="hidden lg:block relative lg:shrink-0 animate-float">
                        <div className="absolute inset-0 bg-yellow-200/40 rounded-3xl blur-3xl"></div>
                        <div className="relative  shadow-[0_25px_60px_-12px_rgba(251,191,36,0.9)] rounded-3xl p-2 transform hover:rotate-1 transition-transform duration-300">
                            <img 
                                className="h-64 md:h-80 lg:h-96 max-w-md rounded-2xl" 
                                src="/images/FloatDoodle.svg" 
                                alt="Job tracking dashboard illustration" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;