// import { EnvLogRepository } from '../domain/repositories/env_log_repository';
import { EnvLog } from '../../domain/entities/envLog';
import { PrismaClient, EnvironmentLog as PrismaEnvLog } from '@prisma/client';
import { EnvLogMapper } from '../mapper/envLogMapper';
import { EnvLogRepository } from '../../domain/repositories/envLogRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class EnvLogRepositoryImpl extends EnvLogRepository {
    private prisma: PrismaClient;
    constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {
        super();
        this.prisma = prismaClient;
    }

    async findMany(limit: number): Promise<EnvLog[]> {
        const envLogs: PrismaEnvLog[] = await this.prisma.environmentLog.findMany({
            take: limit,
            orderBy: { created_at: 'desc' },
        });
        console.log('envLogs', envLogs);

        // ドメイン型に変換して返す
        const res = envLogs.map((envLog) => EnvLogMapper.toDomain(envLog));
        console.log('res', res);
        return res;
    }
    async create(envLog: EnvLog): Promise<EnvLog> {
        const createdEnvLog = await this.prisma.environmentLog.create({
            data: EnvLogMapper.toPrisma(envLog),
        });
        return EnvLogMapper.toDomain(createdEnvLog);
    }
}
