import { useEffect, useState } from "react";

const getCurrentTime = (): string => {
	return new Date().toLocaleTimeString("ja-JP", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};

const getCurrentDate = (): string => {
	const today = new Date();
	return `${today.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })} (${today.toLocaleDateString("ja-JP", { weekday: "long" })})`;
};

const Component = () => {
	const [time, setTime] = useState(getCurrentTime());
	const [date, setDate] = useState(getCurrentDate());

	useEffect(() => {
		const timerId = setInterval(() => {
			setTime(getCurrentTime());
			setDate(getCurrentDate());
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	return (
		<div className="w-full h-full flex flex-col justify-evenly items-center px-2">
			<div className="font-semibold text-2xl xl:text-4xl" id="time">
				{time}
			</div>
			<div className="text-gray-600 text-sm xl:text-lg" id="date">
				{date}
			</div>
		</div>
	);
};

export default Component;
