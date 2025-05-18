import { EnvLog } from '../domain/entities/envLog';
import { injectable, inject } from 'tsyringe';
import { EnvLogRepository } from '../domain/repositories/envLogRepository';

@injectable()
export class GetEnvLogsUseCase {
    constructor(@inject('EnvLogRepository') private envLogRepository: EnvLogRepository) {}

    async execute(limit: number): Promise<EnvLog[]> {
        return this.envLogRepository.findMany(limit);
    }
}

// export async function updateEnv(message: string) {
//     const envLogData = JSON.parse(message);

//     io.emit('env-data', envLogData);
// }

// export async function getEnvLogs(req: Request, res: Response) {
//     const limit = req.query.limit;
//     // ここでデータベースからデータを取得する処理を実装
//     console.log('limit', limit);
//     // const environmentLogs = await prisma.environmentLog.findMany({
//     //   take: Number(limit),
//     //   orderBy: { created_at: 'desc' },
//     // });
//     const environmentLogs: EnvLog[] = [];

//     console.log(environmentLogs);
//     res.status(200).json(environmentLogs);
// }
