import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/organisms/Navbar";
import { SideBar } from "../components/organisms/Sidebar";

export const Root = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-primaryLight dark:bg-primaryDark" dir="rtl">
            {/* Sidebar - Fixed على اليمين */}
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Main content - with margin for sidebar and navbar */}
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${collapsed ? "mr-20" : "mr-64"
                    }`}
            >
                <NavBar collapsed={collapsed} onToggleSidebar={() => setCollapsed(!collapsed)} />

                {/* Content with padding for fixed navbar */}
                <div className="flex-1 overflow-y-auto p-5 mt-16">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};