import { injectable, inject } from 'tsyringe';
import EnvLog from '../domain/entities/envLog';
import EnvLogRepository from '../domain/repositories/envLogRepository';
import { UpdateEnvLogPresenter } from '../interface/presenters/updateEnvLogPresenter';
import DeviceRepository from '../domain/repositories/deviceRepository';
import { error } from 'console';

@injectable()
export class UpdateEnvLogUseCase {
  constructor(
    @inject('UpdateEnvLogPresenter')
    private readonly output: UpdateEnvLogPresenter,
    @inject('EnvLogRepository')
    private readonly envRepo: EnvLogRepository,
    @inject('DeviceRepository')
    private readonly deviceRepo: DeviceRepository,
  ) {}

  async execute(message: any) {
    // 送信元デバイスの存在を確認
    const isExist = await this.deviceRepo.existById(message.deviceId);
    if (!isExist) {
      // 有効なデバイスからの情報ではない
      return error;
    }

    // 環境値ドメインを作成
    const envLog = new EnvLog({
      deviceId: message.deviceId,
      temperatureSht: message.temperatureSht,
      humidity: message.humidity,
      temperatureQmp: message.temperatureQmp,
      pressure: message.pressure,
      createdAt: message.createdAt ? new Date(message.createdAt) : new Date(), // encoded にあればそれを使用、なければ現在時刻
      updatedAt: message.updatedAt ? new Date(message.updatedAt) : new Date(), // 同上
    });
    const data = await this.envRepo.create(envLog);

    this.output.present(data);
  }
}
