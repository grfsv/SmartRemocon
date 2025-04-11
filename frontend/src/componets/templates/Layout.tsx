import Header from "@/componets/organisms/Header";
import Sidebar from "@/componets/organisms/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router";

const Component = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="bg-[#F9FBFC] text-gray-800 font-sans h-screen flex flex-col">
			{/* Header */}
			<Header
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<div className="flex flex-1 h-full overflow-auto">
				{/* Sidebar */}
				<Sidebar isSidebarOpen={isSidebarOpen} />
				{/* Main Content */}
				<main className="flex-1 h-full overflow-y-auto transition-all duration-300">
					<Outlet />
				</main>
			</div>

			{/* Overlay for closing sidebar */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
					onClick={toggleSidebar}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							toggleSidebar();
						}
					}}
					role="button"
					tabIndex={0}
				/>
			)}
		</div>
	);
};

export default Component;
