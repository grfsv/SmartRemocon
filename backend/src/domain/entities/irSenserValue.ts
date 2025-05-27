import { Device } from './device';

type IRSensorValueProps = {
    id: number;
    device: Device;
    name: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
};

export class IRSensorValue {
    private readonly _id?: number;
    private _device: Device;
    private _name: string;
    private _data: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: IRSensorValueProps) {
        this._id = props.id;
        this._device = props.device;
        this._name = props.name;
        this._data = props.data;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
    }

    get id(): number | undefined {
        return this._id;
    }

    get device(): Device {
        return this._device;
    }
    set device(device: Device) {
        this._device = device;
    }

    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    get data(): string {
        return this._data;
    }
    set data(data: string) {
        this._data = data;
    }

    get createdAt(): Date {
        return this._createdAt;
    }
    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }
}
