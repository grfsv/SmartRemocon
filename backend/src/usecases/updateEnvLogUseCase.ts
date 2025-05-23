import { injectable, inject } from 'tsyringe';
import { EnvLog } from '../domain/entities/envLog';
import { EnvLogRepository } from '../domain/repositories/envLogRepository';
import { UpdateEnvLogOutputPort } from '../interface/presenters/updateEnvLogOutputPort';

@injectable()
export class UpdateEnvLogUseCase {
    constructor(
        @inject('UpdateEnvLogOutputPort')
        private readonly output: UpdateEnvLogOutputPort,
        @inject('EnvLogRepository')
        private readonly repo: EnvLogRepository,
    ) {}

    async execute(envLog: EnvLog) {
        const data = await this.repo.create(envLog);
        console.log('envLog', envLog);
        console.log('data', data);
        this.output.present(data);
    }
}
