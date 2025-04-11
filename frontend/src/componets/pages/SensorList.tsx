import type { IRSensorValue } from "@/types/irSensorValue";
import { fetchInstance } from "@/utils/fetchInstance";
import { type FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import useSWR from "swr";

const formatTimestamp = (timestamp: string | Date) => {
	const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

type Props = {
	socket: Socket;
};

const Component: FC<Props> = ({ socket }) => {
	const [sensors, setSensors] = useState<IRSensorValue[]>([]);

	const { data, error, isLoading } = useSWR<IRSensorValue[]>("/sensor-list");

	useEffect(() => {
		if (data) {
			setSensors(data);
		}
	}, [data]);

	useEffect(() => {
		socket.on("ir_sensor_update", (updatedSensor: IRSensorValue) => {
			setSensors((prev) =>
				prev.map((sensor) =>
					sensor.id === updatedSensor.id ? updatedSensor : sensor,
				),
			);
		});

		return () => {
			socket.off("ir_sensor_update");
		};
	}, [socket]);

	const handleExecute = (sensor: IRSensorValue) => {
		const instance = fetchInstance();
		instance
			.post("/esp/send", { sensorId: sensor.id, learnedIRData: sensor.data })
			.then((response) => {
				console.log("実行結果:", response.data);
			})
			.catch((error) => {
				console.error("実行エラー:", error);
			});
	};

	const handleLearn = (sensor: IRSensorValue) => {
		const instance = fetchInstance();
		instance
			.post("/esp/learn", { sensorId: sensor.id })
			.then((response) => {
				console.log("学習結果:", response.data);
			})
			.catch((error) => {
				console.error("学習エラー:", error);
			});
	};

	const handleCreate = async () => {
		const instance = fetchInstance();

		try {
			const metricsResponse = await instance.get("/devices?collectMetrics=1");
			const device = metricsResponse.data[0];

			if (!device) {
				console.error("Device ID not found in response.");
				return;
			}

			const newSensor = {
				device: device,
				name: "新しいセンサー",
				data: "",
			};

			const response = await instance.post("/sensor-list", newSensor);
			setSensors((prev) => [...prev, response.data]);
		} catch (error) {
			console.error("センサー作成エラー:", error);
		}
	};

	const handleNameChange = (id: number, newName: string) => {
		setSensors((prev) =>
			prev.map((s) => (s.id === id ? { ...s, name: newName } : s)),
		);
	};

	const handleSaveName = (sensor: IRSensorValue) => {
		const instance = fetchInstance();
		instance
			.put(`/sensor/${sensor.id}`, { name: sensor.name })
			.then((response) => {
				console.log("名前更新結果:", response.data);
			})
			.catch((error) => {
				console.error("名前更新エラー:", error);
			});
	};

	const handleDelete = (sensor: IRSensorValue) => {
		const instance = fetchInstance();
		instance
			.delete(`/sensor/${sensor.id}`)
			.then((response) => {
				setSensors((prev) => prev.filter((s) => s.id !== sensor.id));
			})
			.catch((error) => {
				console.error("削除エラー:", error);
			});
	};

	if (isLoading) {
		return <div>読み込み中...</div>;
	}

	if (error) {
		return <div>エラーが発生しました: {error.message}</div>;
	}

	return (
		<div className="bg-gradient-to-br from-[#F9FAFB] to-[#EEF1F5] text-gray-800 font-sans min-h-screen p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700">
						📡 IRセンサーリスト
					</h1>
					<button
						type="button"
						onClick={handleCreate}
						className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-md active:scale-95 transition-transform duration-100"
					>
						＋ 作成
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sensors.map((sensor) => (
						<div
							key={sensor.id}
							className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
						>
							<div className="mb-4">
								<label
									htmlFor="sensorName"
									className="block text-sm font-semibold text-gray-600 mb-1"
								>
									名前（ID: {sensor.id}）
								</label>
								<div className="flex space-x-2">
									<input
										type="text"
										value={sensor.name}
										onChange={(e) =>
											handleNameChange(sensor.id, e.target.value)
										}
										className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
									/>
									<button
										type="button"
										onClick={() => handleSaveName(sensor)}
										className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md shadow active:scale-95 transition"
									>
										保存
									</button>
								</div>
							</div>

							<p className="text-sm text-gray-500 mb-1">
								<span className="font-medium">Device ID:</span>{" "}
								<span className="font-mono">{sensor.device.id}</span>
							</p>
							<p className="text-xs text-gray-400 break-words mb-2">
								<span className="font-medium">Data:</span> {sensor.data}
							</p>
							<p className="text-xs text-gray-400">
								<span className="font-medium">作成:</span>{" "}
								{formatTimestamp(sensor.createdAt)}
							</p>
							<p className="text-xs text-gray-400 mb-4">
								<span className="font-medium">更新:</span>{" "}
								{formatTimestamp(sensor.updatedAt)}
							</p>

							<div className="flex space-x-2">
								<button
									type="button"
									onClick={() => handleExecute(sensor)}
									className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 rounded-lg shadow active:scale-95 transition"
								>
									実行
								</button>
								<button
									type="button"
									onClick={() => handleLearn(sensor)}
									className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-1 rounded-lg shadow active:scale-95 transition"
								>
									学習
								</button>
								<button
									type="button"
									onClick={() => handleDelete(sensor)}
									className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded-lg shadow active:scale-95 transition"
								>
									削除
								</button>
							</div>
						</div>
					))}
					{sensors.length === 0 && (
						<div className="col-span-full text-center text-gray-400 text-sm">
							センサーが登録されていません。
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Component;
