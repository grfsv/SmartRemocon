import { injectable } from 'tsyringe';
import { EnvLog } from '../entities/envLog';

export abstract class EnvLogRepository {
    abstract findMany(limit: number): Promise<EnvLog[]>;
    abstract create(envLog: EnvLog): Promise<EnvLog>;
}
