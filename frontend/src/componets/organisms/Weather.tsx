import {
	faBolt,
	faCloud,
	faCloudRain,
	faCloudSun,
	faMoon,
	faSmog,
	faSnowflake,
	faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type JSX, useCallback, useEffect, useState } from "react";

// 天気データ1件の型
interface WeatherListItem {
	dt_txt: string;
	main: {
		temp: number;
		temp_min: number;
		temp_max: number;
		humidity: number;
	};
	weather: {
		description: string;
		icon: string;
		main: string;
	}[];
	wind: {
		speed: number;
	};
}

// 天気情報のインターフェース
interface WeatherData {
	list: WeatherListItem[];
	city: { name: string };
}

// 天気アイコンの取得
const getWeatherIcon = (iconCode: string): JSX.Element => {
	const iconMap: Record<string, JSX.Element> = {
		"01d": <FontAwesomeIcon icon={faSun} className="text-yellow-500" />,
		"01n": <FontAwesomeIcon icon={faMoon} className="text-gray-400" />,
		"02d": <FontAwesomeIcon icon={faCloudSun} className="text-yellow-400" />,
		"02n": <FontAwesomeIcon icon={faCloudSun} className="text-gray-500" />,
		"03d": <FontAwesomeIcon icon={faCloud} className="text-gray-400" />,
		"03n": <FontAwesomeIcon icon={faCloud} className="text-gray-400" />,
		"04d": <FontAwesomeIcon icon={faCloud} className="text-gray-500" />,
		"04n": <FontAwesomeIcon icon={faCloud} className="text-gray-500" />,
		"09d": <FontAwesomeIcon icon={faCloudRain} className="text-blue-500" />,
		"09n": <FontAwesomeIcon icon={faCloudRain} className="text-blue-500" />,
		"10d": <FontAwesomeIcon icon={faCloudRain} className="text-blue-500" />,
		"10n": <FontAwesomeIcon icon={faCloudRain} className="text-blue-500" />,
		"11d": <FontAwesomeIcon icon={faBolt} className="text-yellow-600" />,
		"11n": <FontAwesomeIcon icon={faBolt} className="text-yellow-600" />,
		"13d": <FontAwesomeIcon icon={faSnowflake} className="text-blue-300" />,
		"13n": <FontAwesomeIcon icon={faSnowflake} className="text-blue-300" />,
		"50d": <FontAwesomeIcon icon={faSmog} className="text-gray-400" />,
		"50n": <FontAwesomeIcon icon={faSmog} className="text-gray-400" />,
	};
	return (
		iconMap[iconCode] || (
			<FontAwesomeIcon icon={faCloud} className="text-gray-400" />
		)
	);
};

const WeatherComponent = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [apiKey, setApiKey] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// API KeyをlocalStorageに保存
	const saveApiKey = (key: string) => {
		localStorage.setItem("weatherApiKey", key);
		setApiKey(key);
	};

	// localStorageからAPI Keyを取得
	const getSavedApiKey = useCallback(() => {
		const storedApiKey = localStorage.getItem("weatherApiKey");
		return storedApiKey ? storedApiKey : null;
	}, []);

	useEffect(() => {
		const savedApiKey = getSavedApiKey();
		if (savedApiKey) {
			setApiKey(savedApiKey);
		}
	}, [getSavedApiKey]);

	useEffect(() => {
		const fetchWeather = async () => {
			const apiKey = getSavedApiKey();
			if (!apiKey) {
				setErrorMessage("API Key を入力してください。");
				setWeatherData(null);
				return;
			}

			const city = "Osaka";
			const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ja&appid=${apiKey}`;

			try {
				const response = await fetch(weatherApiUrl);
				const data = await response.json();

				if (data.cod !== "200") {
					setErrorMessage(
						"天気情報を取得できませんでした。API Key または都市名を確認してください。",
					);
					return;
				}

				setWeatherData(data);
				setErrorMessage(null);
			} catch (error) {
				setErrorMessage(`エラーが発生しました: ${error}`);
			}
		};

		fetchWeather();
	}, [getSavedApiKey]);

	if (errorMessage) {
		return (
			<div className="w-full h-full mx-auto flex flex-col justify-around">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<p>{errorMessage}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full mx-auto flex flex-col justify-around">
			{/* 今日の天気詳細表示 */}
			{weatherData && (
				<div id="todayWeather" className="py-2 px-8">
					<div className="flex items-center justify-between">
						<div className="flex flex-col">
							<span id="cityName" className="text-2xl break-keep">
								{weatherData.city.name}
							</span>
							<span id="currentTime" className="text-xl text-gray-600">
								{new Date(weatherData.list[0].dt_txt).toLocaleString("ja-JP", {
									hour: "numeric",
									minute: "numeric",
								})}
							</span>
						</div>
						<div className="flex justify-center items-center gap-8">
							<div className="text-8xl">
								{getWeatherIcon(weatherData.list[0].weather[0].icon)}
							</div>
							<div>
								<div className="flex items-baseline">
									<p id="todayTemp" className="text-6xl font-extrabold">
										{weatherData.list[0].main.temp.toFixed(1)}
									</p>
									<p className="text-xl">°C</p>
								</div>
								<p className="text-gray-600 text-right">
									{weatherData.list[0].weather[0].description}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WeatherComponent;
