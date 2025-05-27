import { EnvLog } from '../domain/entities/envLog';
import { injectable, inject } from 'tsyringe';
import { EnvLogRepository } from '../domain/repositories/envLogRepository';
@injectable()
export class GetListEnvLogUseCase {
    constructor(@inject('EnvLogRepository') private readonly repo: EnvLogRepository) {}

    async execute(limit: number): Promise<EnvLog[]> {
        return this.repo.findMany(limit);
    }
}
