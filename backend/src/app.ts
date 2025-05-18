/**
 * サーバー起動スクリプト
 *
 * このスクリプトは、Expressを使用して基本的なHTTPサーバーを起動します。
 * JSONリクエストボディの解析ミドルウェアを設定し、指定されたポートで待ち受けます。
 *
 * 使用技術:
 * - Express（Webフレームワーク）
 * - Node.js httpモジュール
 *
 *  Date : 2025/04/01 - 2025/07/31
 *  Author : K.Murakami
 */

// Expressライブラリをインポート（Node.jsのWebアプリケーションフレームワーク）
import express from 'express';
import { Server, Socket } from 'socket.io';
import 'reflect-metadata';
// httpモジュールをインポート（Node.jsの標準モジュール、HTTPサーバーを作成するために使用）
import http from 'http';
import { container } from 'tsyringe';
import { WebSocketController } from './infrastructure/websocket/websocket';
import apiRoutes from './routes/routes';
// import { getEnvLogs, updateEnv } from './useCase/getEnvLogsUseCase';

import { EnvLogRepositoryImpl } from './infrastructure/database/envLogRepositoryImpl';
import { EnvLogRepository } from './domain/repositories/envLogRepository';
import { PrismaClient } from '@prisma/client';

// expressアプリケーションのインスタンスを作成
const app = express();

// HTTPサーバーをexpressアプリを基に作成
export const httpServer: http.Server = http.createServer(app);

// 依存関係を登録
container.register<EnvLogRepository>('EnvLogRepository', { useClass: EnvLogRepositoryImpl });
// コンテナにHTTPサーバーを登録
container.registerInstance<http.Server>('WebServer', httpServer);

const prismaClient = new PrismaClient();

container.register('PrismaClient', { useValue: prismaClient });

// WebSocketの依存関係を解消
container.resolve(WebSocketController);

// 受信するリクエストのボディをJSONとして自動的に解析するミドルウェアを追加
app.use(express.json());

// ルーティングの設定
app.use('/api', apiRoutes);

const mqttClient = require('./mqtt').mqttClient;

// mqttClient.subscribe('env-data', updateEnv);
// サーバーがリッスンするポート番号を指定
const port = 8000;

// 指定したポートでHTTPサーバーを起動し、起動成功時にメッセージを出力
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
