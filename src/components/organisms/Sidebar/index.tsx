import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiUsers,
    FiClipboard,
    FiMenu,
    FiChevronRight,
    FiChevronDown,
} from "react-icons/fi";
import { IoMdColorPalette } from "react-icons/io";

import { IoMdContact } from "react-icons/io";

import { useState } from "react";

const links = [
    { label: "الرئيسية", icon: FiHome, link: "/dashboard" },
    { label: "المستخدمين", icon: FiClipboard, link: "/dashboard/users" },
    {
        label: "الالوان", icon: IoMdColorPalette, link: "/dashboard/colors" },
    {
        label: "التصنيفات",
        icon: FiUsers,
        link: "/categories",
        subLinks: [
            { label: "الاصناف الرئيسية", link: "/dashboard/categories" },
            { label: "الاصناف الفرعيه", link: "/dashboard/sup-categories" },
        ],
    },
    { label: "المنتجات", icon: FiClipboard, link: "/dashboard/products" },
    {
        label: "التواصل", icon: IoMdContact , link: "/dashboard/contacts" },
];

interface SideBarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const SideBar = ({ collapsed, setCollapsed }: SideBarProps) => {
    const location = useLocation();
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

    const toggleAccordion = (label: string) => {
        setOpenAccordions((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <aside
            className={`fixed text-right right-0 top-0 bg-white dark:bg-primaryDark  h-screen flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Logo / Brand with Toggle Button */}
            <div className="p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
                    aria-label={collapsed ? "فتح القائمة" : "إغلاق القائمة"}
                >
                    {collapsed ? <FiMenu className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
                </button>
                {!collapsed && (
                    <h1 className="text-2xl font-bold text-primaryDark dark:text-primaryLight">Exora</h1>
                )}
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.link;
                        const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                        const isAccordionOpen = openAccordions[link.label];

                        return (
                            <li key={link.label}>
                                {hasSubLinks ? (
                                    <button
                                        onClick={() => toggleAccordion(link.label)}
                                        className={`flex items-center p-3 rounded-lg w-full transition-colors
                      ${collapsed ? "justify-center" : "justify-between"} 
                      text-primaryDark dark:text-primaryLight
                      ${isActive ? "bg-black text-white" : ""}
                      hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white`}
                                        title={collapsed ? link.label : ""}
                                    >
                                        <Icon className="w-5 h-5 shrink-0 ml-0" />
                                        {!collapsed && (
                                            <>
                                                <span className="font-medium whitespace-nowrap overflow-hidden">{link.label}</span>
                                                <FiChevronDown
                                                    className={`w-4 h-4 transition-transform ${isAccordionOpen ? "rotate-180" : ""}`}
                                                />
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <Link
                                        to={link.link}
                                        className={`flex items-center p-3 rounded-lg w-full transition-colors
                      ${collapsed ? "justify-center" : "justify-start"} 
                      text-primaryDark dark:text-primaryLight
                      ${isActive ? "bg-black text-white" : ""}
                      hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white`}
                                        title={collapsed ? link.label : ""}
                                    >
                                        <Icon className="w-5 h-5 shrink-0 ml-0" />
                                        {!collapsed && (
                                            <span className="font-medium whitespace-nowrap overflow-hidden mr-3">{link.label}</span>
                                        )}
                                    </Link>
                                )}

                                {/* SubLinks */}
                                {hasSubLinks && isAccordionOpen && !collapsed && (
                                    <ul className="mr-6 mt-2 space-y-1">
                                        {link.subLinks!.map((subLink) => {
                                            const isSubActive = location.pathname === subLink.link;
                                            return (
                                                <li key={subLink.label}>
                                                    <Link
                                                        to={subLink.link}
                                                        className={`block p-2 rounded-lg text-sm text-primaryDark dark:text-primaryLight transition-colors
                              ${isSubActive ? "bg-black text-white" : ""}
                              hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white`}
                                                    >
                                                        {subLink.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm text-center">
                    &copy; 2025 MyApp
                </div>
            )}
        </aside>
    );
};
