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

      // console.log('get', envLogs[0]);

      const envLogDataWithoutUnderscore = envLogs.map((item) => item.toJSON());

      console.log('get', envLogDataWithoutUnderscore.length);

      res.status(200).json(envLogDataWithoutUnderscore);
    } catch (error) {
      console.error('Error fetching env logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
