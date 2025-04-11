import EnvLog from "@/componets/pages/EnvLog";
import Home from "@/componets/pages/Home";
import NotFound from "@/componets/pages/NotFound";
import Layout from "@/componets/templates/Layout";
import type { FC } from "react";
import { Route, Routes } from "react-router";
import type { Socket } from "socket.io-client";
import Device from "./componets/pages/Device";
import SensorList from "./componets/pages/SensorList";

type Props = {
	socket: Socket;
};

const App: FC<Props> = ({ socket }) => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home socket={socket} />} />
				<Route path="env-logs" element={<EnvLog socket={socket} />} />
				<Route path="device" element={<Device socket={socket} />} />
				<Route path="sensor-list" element={<SensorList socket={socket} />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;