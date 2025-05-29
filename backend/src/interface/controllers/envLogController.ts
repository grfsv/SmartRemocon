import { inject, injectable } from 'tsyringe';
import EnvLog from '../../domain/entities/envLog';
import { GetListEnvLogUseCase } from '../../usecases/getListEnvLogUseCase';
@injectable()
export class GetListEnvLogController {
  constructor(@inject('GetListEnvLogUseCase') private readonly useCase: GetListEnvLogUseCase) {}

  async run(req: any, res: any): Promise<void> {
    try {
      const limit = parseInt(req.query.limit) || 30; // クエリパラメータからlimitを取得
      const envLogs = await this.useCase.execute(limit);

      const envLogDataWithoutUnderscore = envLogs.map((item) => {
        const newItem: { [key: string]: any } = {
          id: item.id,
          temperatureQmp: item.temperatureQmp,
          temperatureSht: item.temperatureSht,
          humidity: item.humidity,
          pressure: item.pressure,
          device: {},
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };

        return newItem;
      });

      console.log('get', envLogDataWithoutUnderscore.length);

      res.status(200).json(envLogDataWithoutUnderscore);
    } catch (error) {
      console.error('Error fetching env logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
