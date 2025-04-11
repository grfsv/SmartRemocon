import type { Device } from "@/types/device";
import { type FC, useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import useSWR from "swr";

type Props = {
	socket: Socket;
};

const Component: FC<Props> = ({ socket }) => {
	const filter = { collectMetrics: true };
	const queryParams = new URLSearchParams();
	queryParams.append("filter", JSON.stringify(filter));

	const { data, error, isLoading } = useSWR(
		`/devices?${queryParams.toString()}`,
	);

	const [device, setDevice] = useState<Device | null>(null);

	useEffect(() => {
		if (data && data.length > 0) {
			setDevice(data[0]);
		}

		socket.on("device_update", (newData: Device) => {
			setDevice(newData);
		});

		return () => {
			socket.off("device_update");
		};
	}, [socket, data]);

	if (error) return <div className="text-red-500">Failed to load</div>;
	if (isLoading) return <div className="text-blue-500">Loading...</div>;

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-6">
			{device ? (
				<div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
					<div className="p-8">
						<h2 className="text-3xl font-bold text-gray-800 mb-3">
							{device.name}
						</h2>
						<p className="text-sm text-gray-500 mb-6">{device.location}</p>

						<div className="space-y-5">
							<div className="flex justify-between items-center">
								<span className="text-gray-600 font-medium">MAC Address:</span>
								<span className="text-gray-700">{device.macAddress}</span>
							</div>

							<div className="flex justify-between items-center">
								<span className="text-gray-600 font-medium">IP Address:</span>
								<span className="text-gray-700">{device.ipAddress}</span>
							</div>

							<div className="flex justify-between items-center">
								<span className="text-gray-600 font-medium">
									Registered At:
								</span>
								<span className="text-gray-700">
									{new Date(device.registeredAt).toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between items-center">
								<span className="text-gray-600 font-medium">
									Metrics Collection:
								</span>
								<span
									className={`font-semibold ${
										device.collectMetrics ? "text-green-600" : "text-red-600"
									}`}
								>
									{device.collectMetrics ? "Enabled" : "Disabled"}
								</span>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="text-center text-gray-500">No devices found.</div>
			)}
		</div>
	);
};

export default Component;
