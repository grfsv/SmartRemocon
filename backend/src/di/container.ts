// src/di/container.ts
import 'reflect-metadata';
import { container } from 'tsyringe';
import { EnvLogRepository } from '../domain/repositories/envLogRepository';
import { EnvLogRepositoryImpl } from '../infrastructure/database/envLogRepositoryImpl';
import { UpdateEnvLogsOutputPort } from '../interface/presenters/updateEnvLogsOutputPort';
import { WebSocketController } from '../infrastructure/websocket/websocket';

// インターフェースと実装のバインド
container.registerSingleton<EnvLogRepository>('EnvLogRepository', EnvLogRepositoryImpl);
container.registerSingleton<UpdateEnvLogsOutputPort>(
    'UpdateEnvLogsOutputPort',
    WebSocketController,
);

export { container };
