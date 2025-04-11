import type { Device } from "./device";

export type EnvLog = {
	id: number;
	device: Device;
	temperatureSht: number;
	humidity: number;
	temperatureQmp: number;
	pressure: number;
	createdAt: Date;
	updatedAt: Date;
};
