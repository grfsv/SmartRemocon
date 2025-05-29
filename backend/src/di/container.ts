// src/di/container.ts
import 'reflect-metadata';
import { container } from 'tsyringe';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import { EnvLogRepositoryImpl } from '../infrastructure/database/envLogRepositoryImpl';
import EnvLogRepository from '../domain/repositories/envLogRepository';
import { GetListEnvLogController } from '../interface/controllers/envLogController';
import { WebSocketClient } from '../infrastructure/websocket/websocket';
import { GetListEnvLogUseCase } from '../usecases/getListEnvLogUseCase';
import { UpdateEnvLogUseCase } from '../usecases/updateEnvLogUseCase';
import { UpdateEnvLogPresenter } from '../interface/presenters/updateEnvLogPresenter';
import DeviceRepository from '../domain/repositories/deviceRepository';
import DeviceRepositoryImpl from '../infrastructure/database/deviceRepositoryImpl';

export function initializeContainer(webServer: http.Server) {
    // EnvLogRepository　と EnvLogRepositoryImplの紐付けを行う
    container.register<EnvLogRepository>('EnvLogRepository', { useClass: EnvLogRepositoryImpl });
    // GetEnvLog関連
    // UseCaseInterface と GetListEnvLogUseCaseとの紐付けを行う
    container.register<GetListEnvLogUseCase>('GetListEnvLogUseCase', {
        useClass: GetListEnvLogUseCase,
    });
    container.register<GetListEnvLogController>('GetListEnvLogController', {
        useClass: GetListEnvLogController,
    });
    // CreateEnvLog関連

    // UseCaseInterface と UpdateEnvLogUseCaseとの紐付けを行う
    container.register<UpdateEnvLogUseCase>('UpdateEnvLogUseCase', {
        useClass: UpdateEnvLogUseCase,
    });

    container.register<UpdateEnvLogPresenter>('UpdateEnvLogPresenter', {
        useClass: UpdateEnvLogPresenter,
    });
    container.register<DeviceRepository>('DeviceRepository', {
        useClass: DeviceRepositoryImpl,
    });

    container.registerInstance<http.Server>('WebServer', webServer);
    container.registerInstance<WebSocketClient>('WebSocketClient', new WebSocketClient(webServer));
    container.registerInstance('PrismaClient', new PrismaClient());
}
