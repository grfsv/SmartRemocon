// src/di/container.ts
import 'reflect-metadata';
import { container } from 'tsyringe';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import { UpdateEnvLogUseCase } from '../usecases/updateEnvLogUseCase';
import { EnvLog } from '../domain/entities/envLog';
import { UseCase } from '../usecases/common/usecase';
import { EnvLogRepositoryImpl } from '../infrastructure/database/envLogRepositoryImpl';
import { EnvLogRepository } from '../domain/repositories/envLogRepository';
import { GetListEnvLogUseCase } from '../usecases/getListEnvLogUseCase';
import { GetListEnvLogController } from '../interface/controllers/envLogController';
import { WebSocketController } from '../infrastructure/websocket/websocket';
import { UpdateEnvLogOutputPort } from '../interface/presenters/updateEnvLogOutputPort';


export function initializeContainer(webServer: http.Server) {
    // EnvLogRepository　と EnvLogRepositoryImplの紐付けを行う
    container.register<EnvLogRepository>('EnvLogRepository', { useClass: EnvLogRepositoryImpl });
    // GetEnvLog関連
    // UseCaseInterface と GetListEnvLogUseCaseとの紐付けを行う
    container.register<UseCase<number, EnvLog[]>>('GetListEnvLogUseCase', {
        useClass: GetListEnvLogUseCase,
    });
    container.register<GetListEnvLogController>('GetListEnvLogController', {
        useClass: GetListEnvLogController,
    });
    // CreateEnvLog関連

    // UseCaseInterface と UpdateEnvLogUseCaseとの紐付けを行う
    container.register<UseCase<EnvLog, void>>('UpdateEnvLogUseCase', {
        useClass: UpdateEnvLogUseCase,
    });

    container.register<UpdateEnvLogUseCase>('UpdateEnvLogUseCase', {
        useClass: UpdateEnvLogUseCase,
    });
    container.register<UpdateEnvLogOutputPort>('UpdateEnvLogOutputPort', {
        useClass: WebSocketController,
    });
    container.registerInstance<http.Server>('WebServer', webServer);
    container.registerInstance('PrismaClient', new PrismaClient());
}
