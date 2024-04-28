import Router from 'express';
import cors from 'cors';
import tenistaRouter from './routers/TenistaRouter';
import partidoRouter from './routers/PartidoRouter';
import Paths from '@src/constants/Paths';

const apiRouter = Router();

const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('@src/../swaggerConfig');

apiRouter.use(cors());
apiRouter.use('@src/../api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
apiRouter.use(Paths.Tenistas.Base, tenistaRouter);
apiRouter.use(Paths.Partidos.Base, partidoRouter);
 
export default apiRouter;