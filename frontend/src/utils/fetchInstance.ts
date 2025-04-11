import axios from "axios";

export const fetchInstance = () => {
	const baseURL = `${window.location.origin}/api`;

	return axios.create({
		baseURL: baseURL,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
