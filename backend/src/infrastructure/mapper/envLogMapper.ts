import EnvLog from '../../domain/entities/envLog';
import { EnvLog as PrismaEnvLog } from '@prisma/client';

/**
 * @class EnvLogMapper
 * @description EnvLogをドメインオブジェクトとデータベースオブジェクトの間で変換するためのマッパー
 * @example
 * const envLog = EnvLogMapper.toDomain(prismaEnvLog);
 * const prismaEnvLog = EnvLogMapper.toPrisma(envLog);
 * @param {PrismaEnvLog} PrismaEnvLog - PrismaEnvLog
 * @param {EnvLog} envLog - EnvLog
 */

export class EnvLogMapper {
  static toDomain(PrismaEnvLog: PrismaEnvLog): EnvLog {
    return new EnvLog({
      id: PrismaEnvLog.id,
      deviceId: PrismaEnvLog.deviceId,
      temperatureSht: PrismaEnvLog.temperature_sht,
      humidity: PrismaEnvLog.humidity,
      temperatureQmp: PrismaEnvLog.temperature_qmp,
      pressure: PrismaEnvLog.pressure,
      createdAt: PrismaEnvLog.created_at,
      updatedAt: PrismaEnvLog.updated_at,
    });
  }

  // static toPrisma(envLog: EnvLog): PrismaEnvLog {
  //     return ;
  // }
}
