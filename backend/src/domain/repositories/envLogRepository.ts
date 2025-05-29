import EnvLog from '../entities/envLog';

export default abstract class EnvLogRepository {
  abstract findMany(limit: number): Promise<EnvLog[]>;
  abstract create(envLog: EnvLog): Promise<EnvLog>;
}
