import {
	faHome,
	faList, // センサーリスト用に追加
	faMicrochip,
	faPlug,
	faThermometerHalf,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { Link } from "react-router";

type Props = {
	isSidebarOpen: boolean;
};

const Component: FC<Props> = ({ isSidebarOpen }) => {
	return (
		<aside
			className={`w-64 bg-white shadow-lg h-full flex flex-col p-4 fixed top-0 left-0 transform ${
				isSidebarOpen ? "translate-x-0" : "-translate-x-full"
			} transition-transform duration-300 lg:relative lg:translate-x-0 z-50`}
		>
			<div className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
				<FontAwesomeIcon icon={faMicrochip} className="mr-2" /> IoT Dashboard
			</div>

			<nav className="flex-1">
				<ul>
					<li className="mb-4">
						<Link
							to="/"
							className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
						>
							<FontAwesomeIcon icon={faHome} className="mr-3" /> Dashboard
						</Link>
					</li>
					<li className="mb-4">
						<Link
							to="/env-logs"
							className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
						>
							<FontAwesomeIcon icon={faThermometerHalf} className="mr-3" /> ENV
							Sensor
						</Link>
					</li>
					<li className="mb-4">
						<Link
							to="/sensor-list"
							className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
						>
							<FontAwesomeIcon icon={faList} className="mr-3" /> Sensor List
						</Link>
					</li>
					<li className="mb-4">
						<Link
							to="/device"
							className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
						>
							<FontAwesomeIcon icon={faPlug} className="mr-3" /> Device
						</Link>
					</li>
				</ul>
			</nav>

			<div className="mt-auto border-t pt-4">
				<div className="flex items-center">
					<FontAwesomeIcon
						icon={faUserCircle}
						className="text-gray-500 text-2xl mr-2"
					/>
					<span className="text-gray-700">User Name</span>
				</div>
			</div>
		</aside>
	);
};

export default Component;
