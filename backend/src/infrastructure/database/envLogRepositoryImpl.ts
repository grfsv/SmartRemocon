// import { EnvLogRepository } from '../domain/repositories/env_log_repository';
import EnvLog from '../../domain/entities/envLog';
import { Prisma, PrismaClient, EnvironmentLog as PrismaEnvLog } from '@prisma/client';
import { EnvLogMapper } from '../mapper/envLogMapper';
import EnvLogRepository from '../../domain/repositories/envLogRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class EnvLogRepositoryImpl extends EnvLogRepository {
    constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {
        super();
    }

    async findMany(limit: number): Promise<EnvLog[]> {
        const envLogs: PrismaEnvLog[] = await this.prisma.environmentLog.findMany({
            take: limit,
            orderBy: { created_at: 'desc' },
        });

        // ドメイン型に変換して返す
        const res = envLogs.map((envLog) => EnvLogMapper.toDomain(envLog));
        return res;
    }
    async create(envLog: EnvLog): Promise<EnvLog> {
        const createdEnvLog = await this.prisma.environmentLog.create({
            data: {
                temperature_sht: envLog.temperatureSht,
                humidity: envLog.humidity,
                temperature_qmp: envLog.temperatureQmp,
                pressure: envLog.pressure,
                created_at: envLog.createdAt,
                updated_at: envLog.updatedAt,
                device: {
                    connect: {
                        id: envLog.deviceId,
                    },
                },
            },
        });
        return EnvLogMapper.toDomain(createdEnvLog);
    }
}
