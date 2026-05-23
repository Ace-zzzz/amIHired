import { useState, useRef, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import useGoto from '../../hooks/useGoto';

const ProfileDropdown = ({ username, email }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { goToLogout } = useGoto();
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-orange-400 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                        {username[0].toUpperCase()}
                    </span>
                </div>
                <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{username}</div>
                    <div className="text-xs text-gray-500">{email}</div>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* Settings */}
                    <button
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                    </button>

                    {/* Divider */}
                    <div className="my-1 border-t border-gray-200" />

                    {/* Sign Out */}
                    <button
                        onClick={goToLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
