import type { Device } from './device';

type EnvLogProps = {
    id?: number;
    device: Device;
    temperatureSht: number;
    humidity: number;
    temperatureQmp: number;
    pressure: number;
    createdAt: Date;
    updatedAt: Date;
};

export class EnvLog {
    private readonly _id?: number;
    private _device?: Device;
    private _temperatureSht: number;
    private _humidity: number;
    private _temperatureQmp: number;
    private _pressure: number;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: EnvLogProps) {
        if (props.id) this._id = props.id;
        this._device = props.device;
        this._temperatureSht = props.temperatureSht;
        this._humidity = props.humidity;
        this._temperatureQmp = props.temperatureQmp;
        this._pressure = props.pressure;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
    }

    get id(): number | undefined {
        return this._id;
    }

    get device(): Device | undefined {
        return this._device;
    }

    set device(device: Device) {
        this._device = device;
    }

    get temperatureSht(): number {
        return this._temperatureSht;
    }
    get humidity(): number {
        return this._humidity;
    }
    get temperatureQmp(): number {
        return this._temperatureQmp;
    }
    get pressure(): number {
        return this._pressure;
    }
    get createdAt(): Date {
        return this._createdAt;
    }
    get updatedAt(): Date {
        return this._updatedAt;
    }

    set temperatureSht(temperatureSht: number) {
        this._temperatureSht = temperatureSht;
    }
    set humidity(humidity: number) {
        this._humidity = humidity;
    }
    set temperatureQmp(temperatureQmp: number) {
        this._temperatureQmp = temperatureQmp;
    }
    set pressure(pressure: number) {
        this._pressure = pressure;
    }
    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }
    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }
}
