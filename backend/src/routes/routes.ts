import express, { Router } from 'express';
import { EnvLogController } from '../interface/controllers/envLogController';

const apiRoutes: Router = express.Router();

// ルーティングの設定
apiRoutes.get('/env-logs', EnvLogController.getEnvLogs);


export default apiRoutes;
