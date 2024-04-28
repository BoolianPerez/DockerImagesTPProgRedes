import { NextFunction, Router } from 'express';

import Paths from '../../constants/Paths';
import { Tenista } from '@src/classes/dataClasses/Tenista';
import TenistaRoutes from '../TenistaRoutes';
import { IReq } from '../types/types';
import { IRes } from '../types/express/misc';
import errors from '@src/constants/Errors'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

/**
 * @swagger
 *  /tenistas?id:
 *   summary: Operacion GET ONE sobre los tenistas.
 *    description: GET un tenista en particular.
 *    parameters:
 *        - in: path
 *        name: id
 *        required: false
 *       schema:
 *         type: integer
 *        minimum: 0
 *       maximum: 1
 *   '200':
 *     description: El tenista con la ID pasada
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/Tenista'
 *  '500':
 *   description: No se pudo encontrar el tenista de ID pasada.
 *   content:
 *    text/plain:
 *    schema:
 *    type: string
 *   description: "Mensaje de error"
 * @swagger
 * /tenistas:
 * get:
 *  summary: Operacion GET sobre los tenistas.
 * description: GET todos los tenistas.
 * responses:
 * '200':
 * description: Un array de todos los tenistas
 * content:
 * application/json:
 * schema:
 * type: array
 * items: $ref: '#components/schemas/Tenista'
 * '500':
 * description: No se pudo encontrar una definicion de la base de datos en el servidor
 * content:
 * text/plain:
 * schema:
 * type: string
 * description: "Mensaje de error"
 * @swagger
 * /tenistas:
 * post:
 * summary: Operacion POST sobre los tenistas.
 * description: POST un tenista nuevo.  
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#components/schemas/Tenista'
 * responses:
 * '201':
 * description: Tenista creado exitosamente
 * @swagger
 * /tenistas:
 * patch:
 * summary: Operacion PATCH sobre los tenistas.
 * description: PATCH un tenista existente.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#components/schemas/Tenista'
 * responses:
 * '200':
 * description: Tenista actualizado exitosamente
 * '500':
 * description: No se pudo encontrar una definicion de la base de datos en el servidor
 * content:
 * text/plain:
 * schema:
 * type: string
 * description: "Mensaje de error"
 * @swagger
 * /tenistas:
 * delete:
 * summary: Operacion DELETE sobre los tenistas.
 * description: DELETE un tenista existente.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * minimum: 0
 * maximum: 1
 * responses:
 * '200':
 * description: Tenista eliminado exitosamente
 * '500':
 * description: No se pudo encontrar una definicion de la base de datos en el servidor
 * content:
 * text/plain:
 * schema:
 * type: string
 * description: "Mensaje de error"
 */

const tenistaRouter = Router();

function checkGetType(req: IReq, res: any, next: NextFunction) {
  if (req.query.id) {
    (req as any).routeHandler = 'getOne';
  } else {
    (req as any).routeHandler = 'getAll';
  }
  next();
}

function callGetFunc(req: IReq, res: IRes){
  if ((req as any).routeHandler === 'getOne') {
    return TenistaRoutes.getOne(req, res);
  } else {
    return TenistaRoutes.getAll(req, res);
  }
}

function validateId(req: IReq, res: IRes, next: NextFunction){
    if (req.query.id) {
      next()
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADDELETEREQUEST("Missing id")}); 
    }
}

function validateTenista(req: IReq<Tenista>, res: IRes, next: NextFunction){
  if (!req.body || typeof req.body !== 'object'){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADBODY("Missing object tenista")}); 
  }

  const tenista = req.body

  if (Tenista.isTenista(tenista)){
    next()
    return
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADTENISTAOOBJECT()}); 
}

tenistaRouter.get(
  Paths.Tenistas.Get,
  checkGetType,
  callGetFunc,
);

tenistaRouter.post(
  Paths.Tenistas.Add,
  validateTenista,
  TenistaRoutes.add,
);

tenistaRouter.patch(
  Paths.Tenistas.Update,
  validateTenista,
  TenistaRoutes.update,
);

tenistaRouter.delete(
  Paths.Tenistas.Delete,
  validateId,
  TenistaRoutes.delete,
);

export default tenistaRouter;