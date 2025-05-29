import Device from './device';

type IRSensorValueProps = {
    id: number;
    deviceId: number;
    name: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
};

export default class IRSensorValue {
    private readonly _id?: number;
    private _deviceId: number;
    private _name: string;
    private _data: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: IRSensorValueProps) {
        if (props.id) {
            this._id = props.id;
        }

        this._deviceId = props.deviceId;
        this._name = props.name;
        this._data = props.data;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
    }

    get id(): number | undefined {
        return this._id;
    }

    get deviceId(): number {
        return this._deviceId;
    }

    get name(): string {
        return this._name;
    }

    get data(): string {
        return this._data;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
}
