import type { EnvLog } from "@/types/envLog";
import { type FC, useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import useSWR from "swr";
import APIKey from "../organisms/APIKey";
import Battery from "../organisms/Battery";
import Clock from "../organisms/Clock";
import Graph from "../organisms/Graph";
import Note from "../organisms/Note";
import PressureSensor from "../organisms/PressureSensor";
import Weather from "../organisms/Weather";

type Props = {
	socket: Socket;
};

const Component: FC<Props> = ({ socket }) => {
	const { data, error, isLoading } = useSWR<EnvLog[]>("/env-logs?limit=8");
	const [latest, setLatest] = useState<EnvLog | null>(null);
	const [pastData, setPastData] = useState<EnvLog[]>([]);

	useEffect(() => {
		if (data && data.length > 0) {
			const sortedData = data.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			);
			setLatest(sortedData[sortedData.length - 1]);
			setPastData(sortedData);
		}
	}, [data]);

	useEffect(() => {
		socket.on("env_log_update", (newData: EnvLog) => {
			setPastData((prevPastData) => {
				const updatedData = [...prevPastData, newData].sort(
					(a, b) =>
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
				);
				setLatest(updatedData[updatedData.length - 1]);
				return updatedData;
			});
		});

		return () => {
			socket.off("env_log_update");
		};
	}, [socket]);

	if (error) return <div className="text-red-500">Failed to load</div>;
	if (isLoading || !latest)
		return <div className="text-blue-500">Loading...</div>;

	return (
		<div className="p-4 grid gap-4 grid-rows-8 grid-cols-12 h-full max-h-screen">
			<div className="col-span-12 lg:col-span-3 row-span-4 relative bg-white shadow-lg rounded-lg p-4 order-7 lg:order-1 hidden lg:block">
				<Note />
			</div>
			<div className="col-span-12 lg:col-span-6 row-span-4 relative bg-white shadow-lg rounded-lg p-4 order-6 lg:order-2 hidden lg:block">
				<Weather />
			</div>
			<div className="col-span-12 lg:col-span-3 row-span-2 relative bg-white shadow-lg rounded-lg p-4 order-5 lg:order-3 hidden lg:block">
				<Clock />
			</div>
			<div className="col-span-12 lg:col-span-3 row-span-1 relative bg-white shadow-lg rounded-lg p-4 order-4 lg:order-4 hidden lg:block">
				<Battery />
			</div>
			<div className="col-span-12 lg:col-span-3 row-span-1 relative bg-white shadow-lg rounded-lg p-4 order-3 lg:order-5 hidden lg:block">
				<APIKey />
			</div>
			<div className="col-span-12 lg:col-span-7 row-span-4 lg:row-span-4 relative bg-white shadow-lg rounded-lg p-4 order-2 lg:order-6">
				<Graph data={pastData} />
			</div>
			<div className="col-span-12 lg:col-span-5 row-span-4 lg:row-span-4 relative bg-white shadow-lg rounded-lg p-4 order-1 lg:order-7">
				<PressureSensor data={latest} />
			</div>
		</div>
	);
};

export default Component;
