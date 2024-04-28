import { NextFunction, Router } from 'express';

import Paths from '../../constants/Paths';
import { Partido } from '@src/classes/dataClasses/Partido';
import PartidoRoutes from '../PartidoRoutes';
import { IReq } from '../types/types';
import { IRes } from '../types/express/misc';
import errors from '@src/constants/Errors'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

/**
 *  @swagger
 *    /partidos?id:
 *      summary: Operacion GET ONE sobre los partidos.
 *        description: GET un partido en particular.
 *        parameters:
 *            - in: path
 *            name: id 
 *            required: false
 *            schema:
 *              type: integer
 *              minimum: 0
 *              maximum: 1
 *        '200':
 *              description: El partido con la ID pasada
 *              content: 
 *                application/json:
 *                  schema:
 *                    $ref: '#components/schemas/Partido'
 *        '500':
 *              description: No se pudo encontrar el partido de ID pasada.
 *              content:
 *                text/plain:
 *                  schema:
 *                    type: string
 *                description: "Mensaje de error"
 *            
 *    /partidos:
 *        get:
 *          summary: Operacion GET sobre los partidos.
 *          description: GET todos los partidos.
 *          responses:
 *            '200':
 *              description: Un array de todos los partidos
 *              content: 
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items: $ref: '#components/schemas/Partido'          
 *            '500':              
 *              description: No se pudo encontrar una definicion de la base de datos en el servidor
 *              content:
 *                text/plain:
 *                  schema:
 *                    type: string
 *                description: "Mensaje de error"        
  *    /partidos:
  *        post:
  *          summary: Operacion POST sobre los partidos.
  *          description: POST un partido nuevo.
  *          requestBody:
  *            required: true
  *            content:
  *              application/json:
  *                schema:
  *                  $ref: '#components/schemas/Partido'
  *          responses:
  *            '201':
  *              description: Partido creado exitosamente
  *            '400':
  *              description: El objeto partido en el body no matchea con el schema de Partido
  *              content:
  *                text/plain:
  *                  schema:
  *                    type: string
  *                description: "Mensaje de error"
  *            '500':
  *               description: No se pudo encontrar una definicion de la base de datos en el servidor
  *               content:
  *                text/plain:
  *                  schema:
  *                    type: string
  *                description: "Mensaje de error"
  *     /partidos:
  *       patch:
  *         summary: Operacion PATCH sobre los partidos.
  *         description: PATCH un partido existente.
  *         requestBody:
  *           required: true
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Partido'
  *         responses:
  *           '200':
  *             description: Partido actualizado exitosamente
  *           '400':
  *             description: El objeto partido en el body no matchea con el schema de Partido
  *             content:
  *               text/plain:
  *                 schema:
  *                   type: string
  *               description: "Mensaje de error"
  *          '500':
  *             description: No se pudo encontrar una definicion de la base de datos en el servidor
  *             content:
  *             text/plain:
  *               schema:
  *                type: string
  *             description: "Mensaje de error"
  *    /partidos?id:
  *       delete:
  *            summary: Operacion DELETE sobre los partidos.
  *            description: DELETE un partido existente.
  *            parameters:
  *             - in: path
  *             name: id
  *             required: true
  *             schema:
  *               type: integer
  *                 minimum: 1
  *                 maximum: 1
  *            responses:
  *               '200':
  *                 description: Partido eliminado exitosamente
  *               '400':
  *                 description: No se paso un id en el query
  *                 content:
  *                  text/plain:
  *                   schema:
  *                     type: string
  *                  description: "Mensaje de error"
  *               '500':
  *                  description: No se pudo encontrar una definicion de la base de datos en el servidor
  *                   content:
  *                     text/plain:
  *                       schema:
  *                         type: string
  *                     description: "Mensaje de error"
  *  
  */

const partidoRouter = Router();

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
    return PartidoRoutes.getOne(req, res);
  } else {
    return PartidoRoutes.getAll(req, res);
  }
}

function validateId(req: IReq, res: IRes, next: NextFunction){
    if (req.query.id) {
      next()
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADDELETEREQUEST("Missing id parameter")}); 
    }
}

function validatePartido(req: IReq<Partido>, res: IRes, next: NextFunction){
  if (!req.body || typeof req.body !== 'object'){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADBODY("Missing object partido")}); 
  }

  const partido = req.body
  if (Partido.isPartido(partido)){
    next()
    return
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADPARTIDOOBJECT()}); 
}


partidoRouter.get(
  Paths.Partidos.Get,
  checkGetType,
  callGetFunc,
);

partidoRouter.post(
  Paths.Partidos.Add,
  validatePartido,
  PartidoRoutes.add,
);

partidoRouter.patch(
  Paths.Partidos.Update,
  validatePartido,
  PartidoRoutes.update,
);
  
partidoRouter.delete(
  Paths.Partidos.Delete,
  validateId,
  PartidoRoutes.delete,
);

export default partidoRouter;