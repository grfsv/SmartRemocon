import EnvLog from '../entities/envLog';

export default interface EnvLogRepository {
  findMany(limit: number): Promise<EnvLog[]>;
  create(envLog: EnvLog): Promise<EnvLog>;
}
