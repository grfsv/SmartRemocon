import type { EnvLog } from "@/types/envLog";
import type React from "react";
import { useEffect, useState } from "react";

const ProgressCircles: React.FC<{ data: EnvLog }> = ({ data }) => {
	const [temperatureProgress, setTemperatureProgress] = useState(0);
	const [humidityProgress, setHumidityProgress] = useState(0);
	const [pressureProgress, setPressureProgress] = useState(0);

	useEffect(() => {
		if (data) {
			const temperature = ((data.temperatureSht + 10) / 60) * 75; // Mapping temperature (-10°C to 50°C)
			const humidity = (data.humidity / 100) * 75; // Mapping humidity (0% to 100%)
			const pressure = ((data.pressure / 100 - 950) / 100) * 75; // Mapping pressure (950hPa to 1050hPa)

			setTemperatureProgress(temperature);
			setHumidityProgress(humidity);
			setPressureProgress(pressure);
		}
	}, [data]);

	return (
		<div className="w-full h-full flex justify-center items-center overflow-hidden">
			{/* Temperature Circle */}
			<div className="relative w-full h-full">
				<svg
					className="rotate-[135deg] w-full h-full"
					viewBox="0 0 36 36"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>温度ゲージの表示</title>
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						className="stroke-current text-gray-200"
						strokeWidth="1.5"
						strokeDasharray="75 100"
						strokeLinecap="round"
					/>
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						className="stroke-current text-blue-600"
						strokeWidth="1.5"
						strokeDasharray={`${temperatureProgress} 100`}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
					<span className="text-5xl font-bold text-blue-600">
						{data ? `${data.temperatureSht}℃` : "Data Unavailable"}
					</span>
					<span className="text-blue-600 block">Temp</span>
				</div>
			</div>

			{/* Humidity Circle */}
			<div className="absolute bottom-0 left-2 w-2/5 h-2/5 overflow-hidden">
				<svg
					className="rotate-[135deg] w-full h-full"
					viewBox="0 0 36 36"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>湿度ゲージの表示</title>
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						className="stroke-current text-gray-200"
						strokeWidth="1.5"
						strokeDasharray="75 100"
						strokeLinecap="round"
					/>
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						className="stroke-current text-green-600"
						strokeWidth="1.5"
						strokeDasharray={`${humidityProgress} 100`}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
					<span className="text-xl font-bold text-green-600">
						{data ? `${data.humidity}%` : "Data·Unavailable"}
					</span>
					<span className="text-green-600 block">Humidity</span>
				</div>
			</div>

			{/* Pressure Circle */}
			<div className="absolute bottom-0 right-2 w-2/5 h-2/5 overflow-hidden">
				<svg
					className="rotate-[135deg] w-full h-full"
					viewBox="0 0 36 36"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>圧力ゲージの表示</title>
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						className="stroke-current text-gray-200"
						strokeWidth="1.5"
						strokeDasharray="75 100"
						strokeLinecap="round"
					/>
					<circle
						cx="18"
						cy="18"
						r="16"
						fill="none"
						className="stroke-current text-red-600"
						strokeWidth="1.5"
						strokeDasharray={`${pressureProgress} 100`}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
					<span className="text-xl font-bold text-red-600">
						{data ? (data.pressure / 100).toFixed(1) : "Data Unavailable"}
					</span>
					<span className="text-red-600 block">Pressure (hPa)</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressCircles;
