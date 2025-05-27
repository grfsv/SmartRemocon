import { Device } from '../entities/device';

export abstract class DeviceRepository {
    abstract findById(id: number): Promise<Device | null>;
    abstract findByMacAddress(macAddress: string): Promise<Device | null>;
    abstract findAll(): Promise<Device[]>;
    abstract create(device: Device): Promise<Device>;
    abstract update(device: Device): Promise<Device>;
    abstract delete(id: number): Promise<void>;
}
