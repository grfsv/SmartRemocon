import { Router } from 'express';
import { GetListEnvLogController } from '../interface/controllers/envLogController';
import { container } from 'tsyringe';
import { GetListEnvLogUseCase } from '../usecases/getListEnvLogUseCase';

const apiRoutes: Router = Router();

// ルーティングの設定
// apiRoutes.get(
//     '/env-logs',
//     container.resolve(GetListEnvLogController).run.bind(container.resolve(GetListEnvLogController)),
// );

apiRoutes.get('/env-logs', (req, res) => {
    // リクエスト時に解決
    const controller = container.resolve(GetListEnvLogController);
    return controller.run(req, res);
});

export default apiRoutes;
