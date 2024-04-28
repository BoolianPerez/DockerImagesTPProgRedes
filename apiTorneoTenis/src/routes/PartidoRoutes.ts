import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import PartidoService from '@src/services/PartidoService';
import { Partido } from '@src/classes/dataClasses/Partido';
import { IReq, IRes } from './types/express/misc';
import TenistaRepo from '@src/repos/TenistaRepo';
import errors from '@src/constants/Errors'

function verifyTenistas(res: IRes, partido: Partido){
  try{
    if (!TenistaRepo.persists(partido.jugador1.id) || !TenistaRepo.persists(partido.jugador2.id)){
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADPARTIDOOBJECT()}); 
    }
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function getAll(_: IReq, res: IRes) {
  try{
    const partidos = await PartidoService.getAll();
    return res.status(HttpStatusCodes.OK).json(partidos);
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function getOne(req: IReq, res: IRes){
  const id = +(req.query as any).id;

  try{
    const partido = await PartidoService.getOne(id);
    if (partido === undefined){
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.COULDNTFINDIDERROR(id.toString())})
    }
    return res.status(HttpStatusCodes.OK).json(partido);
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function add(req: IReq<Partido>, res: IRes) {
  const partido = req.body;

  try{
    verifyTenistas(res, partido);
  
    await PartidoService.addOne(partido);
    return res.status(HttpStatusCodes.CREATED).end();
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function update(req: IReq<Partido>, res: IRes) {
  const partido = req.body;

  try{
    verifyTenistas(res, partido);
  
    const updateStatus = await PartidoService.updateOne(partido);
    if (!updateStatus){
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.COULDNTFINDIDERROR(partido.id.toString())})
    }
    return res.status(HttpStatusCodes.OK).end();
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function delete_(req: IReq, res: IRes) {
  const id = +(req.query as any).id;

  try{
    const deleteStatus = await PartidoService.delete(id);
    if (!deleteStatus){
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.COULDNTFINDIDERROR(id.toString())})
    }
    return res.status(HttpStatusCodes.OK).end();
  }catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

export default {
  getAll,
  getOne,
  add,
  update,
  delete: delete_,
} as const;
