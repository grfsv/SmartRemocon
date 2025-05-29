import { randomUUID } from 'crypto';
import { IDomainEvent } from './event';

export default class EnvLogRegisteredEvent implements IDomainEvent {
  readonly eventId: string;
  readonly eventName: string = 'EnvLogRegisteredEvent';
  readonly occurredOn: Date;
  readonly _aggregateId: string;
  readonly _id?: number;
  readonly deviceId?: number;
  readonly temperatureSht: number;
  readonly humidity: number;
  readonly temperatureQmp: number;
  readonly pressure: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    envLogId: number,
    deviceId: number,
    temperatureSht: number,
    humidity: number,
    temperatureQmp: number,
    pressure: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.eventId = randomUUID();
    this.deviceId = deviceId;
    this.temperatureSht = temperatureSht;
    this.humidity = humidity;
    this.temperatureQmp = temperatureQmp;
    this.pressure = pressure;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.occurredOn = new Date();
    this._aggregateId = envLogId.toString();
  }

  getAggregateId(): string {
    return this._aggregateId;
  }
}
