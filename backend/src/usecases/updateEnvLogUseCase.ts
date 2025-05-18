import { injectable, inject } from 'tsyringe';
import { EnvLog } from '../domain/entities/envLog';
import { EnvLogRepository } from '../domain/repositories/envLogRepository';
import { UpdateEnvLogsOutputPort } from '../interface/presenters/updateEnvLogsOutputPort';

@injectable()
export class UpdateEnvLogUseCase {
    constructor(
        @inject('UpdateEnvLogsOutputPort')
        private readonly output: UpdateEnvLogsOutputPort,
        @inject('EnvLogRepository')
        private readonly envLogRepository: EnvLogRepository,
    ) {}

    async execute(envLog: EnvLog) {
        const data = await this.envLogRepository.create(envLog);
        this.output.present(data);
    }
}
