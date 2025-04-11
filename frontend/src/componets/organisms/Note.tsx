const Component = () => {
	return (
		<div className="h-full w-full p-1 overflow-hidden">
			<textarea
				id="note-area"
				className="w-full h-full p-2 bg-transparent rounded-lg shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
				placeholder="ここにメモを書いてください..."
			/>
		</div>
	);
};

export default Component;
