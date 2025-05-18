import { container } from 'tsyringe';
import { GetEnvLogsUseCase } from '../../usecases/getEnvLogsUseCase';

export class EnvLogController {
    static async getEnvLogs(req: any, res: any): Promise<void> {
        try {
            const useCase = container.resolve(GetEnvLogsUseCase);
            const envLogs = await useCase.execute(10); // ここでlimitを指定

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
            
            res.status(200).json(envLogDataWithoutUnderscore);
        } catch (error) {
            console.error('Error fetching env logs:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
