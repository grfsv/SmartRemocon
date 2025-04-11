import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dispatch, FC, SetStateAction } from "react";

type Props = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Component: FC<Props> = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<header className="w-full bg-white p-4 lg:hidden flex items-center border-b-1">
			<button
				type="button"
				onClick={toggleSidebar}
				className="lg:hidden text-2xl"
			>
				<FontAwesomeIcon icon={faBars} />
			</button>
		</header>
	);
};

export default Component;
