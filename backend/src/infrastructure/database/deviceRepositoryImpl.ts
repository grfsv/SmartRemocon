import { PrismaClient } from '@prisma/client';
import DeviceRepository from '../../domain/repositories/deviceRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeviceRepositoryImpl implements DeviceRepository {
  constructor(
    @inject('PrismaClient')
    private readonly prisma: PrismaClient,
  ) {}

  async existById(id: number): Promise<boolean> {
    const result = await this.prisma.device.findFirst({
      where: {
        id: id,
      },
    });
    return result ? true : false;
  }
}
