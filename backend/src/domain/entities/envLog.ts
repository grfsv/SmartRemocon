type EnvLogProps = {
  id?: number;
  deviceId: number;
  temperatureSht: number;
  humidity: number;
  temperatureQmp: number;
  pressure: number;
  createdAt: Date;
  updatedAt: Date;
};

export default class EnvLog {
  private readonly _id?: number;
  private _deviceId: number;
  private _temperatureSht: number;
  private _humidity: number;
  private _temperatureQmp: number;
  private _pressure: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: EnvLogProps) {
    if (props.id) this._id = props.id;
    this._deviceId = props.deviceId;
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

  get deviceId(): number {
    return this._deviceId;
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

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }
  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}
