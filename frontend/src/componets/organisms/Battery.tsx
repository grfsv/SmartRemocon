const Component = () => {
	return (
		<div className="h-full flex items-center justify-center flex-col">
			<div className="w-full flex justify-between items-center">
				<span className="text-[0.7rem] xl:text-[1rem] 2xl:text-[1.25rem] font-semibold">
					Battery
				</span>
				<span className="text-[0.7rem] xl:text-[1rem] 2xl:text-[1.25rem] font-semibold">
					65%
				</span>
			</div>
			<div className="hidden lg:block mt-2 w-full h-4 bg-gray-200 rounded-full">
				<div className="h-full bg-yellow-400 rounded-full w-[65%]" />
			</div>
		</div>
	);
};

export default Component;
