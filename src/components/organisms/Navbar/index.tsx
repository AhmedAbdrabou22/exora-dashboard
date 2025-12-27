import { useState } from "react";
import { Burger, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";

interface NavBarProps {
    collapsed: boolean;
    onToggleSidebar?: () => void;
    onLogout?: () => void;
}

const NavBar = ({ collapsed, onToggleSidebar, onLogout }: NavBarProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    return (
        <header
            className={`fixed top-0 w-full bg-primaryLight dark:bg-primaryDark shadow-md z-40 transition-all duration-300 ${collapsed ? "right-20" : "right-64"
                }`}
            style={{ width: collapsed ? "calc(100% - 5rem)" : "calc(100% - 16rem)" }}
        >
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <div className="lg:hidden">
                        <Burger
                            opened={!collapsed}
                            onClick={onToggleSidebar}
                            aria-label="Toggle sidebar"
                        />
                    </div>
                    <div className="hidden sm:block text-primaryDark dark:text-primaryLight font-medium text-sm">
                        لوحة التحكم / الرئيسية
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <ActionIcon
                        variant="default"
                        onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
                        size="lg"
                    >
                        {colorScheme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
                    </ActionIcon>



                    {/* User Dropdown */}
                    <div className="relative">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="hidden sm:flex flex-col text-sm text-right">
                                <span className="font-semibold">المستخدم الإداري</span>
                                <span className="text-gray-500 text-xs">user@email.com</span>
                            </div>
                            <img
                                src="https://via.placeholder.com/40"
                                alt="profile"
                                className="w-10 h-10 rounded-lg object-cover"
                            />
                        </div>

                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2">
                                <div className="px-4 py-2 border-b border-gray-200 text-right">
                                    <div className="font-semibold">المستخدم الإداري</div>
                                    <div className="text-xs text-gray-500">user@email.com</div>
                                </div>
                                <Link
                                    to="#"
                                    className="block px-4 py-2 text-black hover:bg-gray-100 text-right"
                                >
                                    إعدادات الحساب
                                </Link>
                                <button
                                    onClick={onLogout}
                                    className="w-full text-right px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    تسجيل الخروج
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;