import { EnvLog } from '../../domain/entities/envLog';

export interface UpdateEnvLogOutputPort {
    present(data: EnvLog | null): void;
}
