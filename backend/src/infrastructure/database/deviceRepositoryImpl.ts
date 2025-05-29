import DeviceRepository from '../../domain/repositories/deviceRepository';

export default class DeviceRepositoryImpl implements DeviceRepository {
  async existById(id: number): Promise<boolean> {
    return true;
  }
}
