import type { FC } from "react";
import { Link } from "react-router";

const Component: FC = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center text-center space-y-4">
			<h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
			<p className="text-gray-600">
				Sorry, the page you're looking for does not exist.
			</p>
			<Link to="/" className="text-blue-500 hover:underline text-lg">
				Go back to homepage
			</Link>
		</div>
	);
};

export default Component;
