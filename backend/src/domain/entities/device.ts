import EnvLog from './envLog';
import IRSensorValue from './irSenserValue';

type DeviceProps = {
    id: number;
    macAddress: string;
    ipAddress: string;
    name: string;
    location: string;
    collectMetrics: boolean;
    registeredAt: Date;
    envLog: EnvLog;
    IRSensorValue: IRSensorValue;
    createdAt: Date;
    updatedAt: Date;
};

export default class Device {
    private readonly _id?: number;
    private _macAddress: string;
    private _ipAddress: string;
    private _name: string;
    private _location: string;
    private _collectMetrics: boolean;
    private _registeredAt: Date;
    private _envLog: EnvLog;
    private _IRSensorValue: IRSensorValue;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: DeviceProps) {
        this._id = props.id;
        this._macAddress = props.macAddress;
        this._ipAddress = props.ipAddress;
        this._name = props.name;
        this._location = props.location;
        this._collectMetrics = props.collectMetrics;
        this._registeredAt = props.registeredAt;
        this._envLog = props.envLog;
        this._IRSensorValue = props.IRSensorValue;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
    }
    get id(): number | undefined {
        return this._id;
    }
    get macAddress(): string {
        return this._macAddress;
    }
    set macAddress(macAddress: string) {
        this._macAddress = macAddress;
    }
    get ipAddress(): string {
        return this._ipAddress;
    }
    set ipAddress(ipAddress: string) {
        this._ipAddress = ipAddress;
    }
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }
    get location(): string {
        return this._location;
    }
    set location(location: string) {
        this._location = location;
    }
    get collectMetrics(): boolean {
        return this._collectMetrics;
    }
    set collectMetrics(collectMetrics: boolean) {
        this._collectMetrics = collectMetrics;
    }
    get registeredAt(): Date {
        return this._registeredAt;
    }
    set registeredAt(registeredAt: Date) {
        this._registeredAt = registeredAt;
    }
    get envLog(): EnvLog {
        return this._envLog;
    }
    set envLog(envLog: EnvLog) {
        this._envLog = envLog;
    }
    get IRSensorValue(): IRSensorValue {
        return this._IRSensorValue;
    }
    set IRSensorValue(IRSensorValue: IRSensorValue) {
        this._IRSensorValue = IRSensorValue;
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
