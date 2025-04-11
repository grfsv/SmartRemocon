import type { Device } from "./device";

export type IRSensorValue = {
	id: number;
	device: Device;
	name: string;
	data: string;
	createdAt: Date;
	updatedAt: Date;
};
