import { EnvLog } from '../../domain/entities/envLog';

export interface UpdateEnvLogsOutputPort {
    present(data: EnvLog | null): void;
}
