export default interface DeviceRepository {
  existById(id: number): Promise<boolean>;
  // abstract findById(id: number): Promise<Device | null>;
  // abstract findByMacAddress(macAddress: string): Promise<Device | null>;
  // abstract findAll(): Promise<Device[]>;
  // abstract create(device: Device): Promise<Device>;
  // abstract update(device: Device): Promise<Device>;
  // abstract delete(id: number): Promise<void>;
}
