import { useEffect, useState } from "react";

const Component = () => {
	const [apiKey, setApiKey] = useState<string>("");

	useEffect(() => {
		const savedApiKey = localStorage.getItem("weatherApiKey");
		if (savedApiKey) {
			setApiKey(savedApiKey);
		}
	}, []);

	const saveApiKey = (key: string) => {
		localStorage.setItem("weatherApiKey", key);
		setApiKey(key);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setApiKey(event.target.value);
	};

	const handleSaveClick = () => {
		saveApiKey(apiKey);
		window.location.reload();
	};

	return (
		<div className="w-full h-full flex justify-center items-center space-x-4 break-keep">
			<input
				id="apiKeyInput"
				type="text"
				placeholder="API Key を入力"
				className="w-full p-2 border rounded"
				value={apiKey}
				onChange={handleInputChange}
			/>
			<button
				type="button"
				onClick={handleSaveClick}
				className="bg-blue-500 text-white px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-blue-600 active:scale-95"
			>
				保存
			</button>
		</div>
	);
};

export default Component;
