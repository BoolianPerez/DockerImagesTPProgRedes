import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import TenistaService from '@src/services/TenistaService';
import { Tenista } from '@src/classes/dataClasses/Tenista';
import { IReq, IRes } from './types/express/misc';
import errors from '@src/constants/Errors';

async function getAll(_: IReq, res: IRes) {
  try{
    const tenistas = await TenistaService.getAll();
    return res.status(HttpStatusCodes.OK).json(tenistas);
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function getOne(req: IReq, res: IRes){
  const id = +(req.query as any).id;
  
  try{
    const tenista = await TenistaService.getOne(id);
    if (tenista === undefined){
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.COULDNTFINDIDERROR(id.toString())})
    }
    return res.status(HttpStatusCodes.OK).json(tenista);
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function add(req: IReq<Tenista>, res: IRes) {
  const tenista = req.body;

  try{
    await TenistaService.addOne(tenista);
    return res.status(HttpStatusCodes.CREATED).end();
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function update(req: IReq<Tenista>, res: IRes) {
  const tenista = req.body;

  try{
    const updateStatus = await TenistaService.updateOne(tenista);
    if (!updateStatus){
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.COULDNTFINDIDERROR(tenista.id.toString())})
    }
    return res.status(HttpStatusCodes.OK).end();
  } catch(err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.MISSINGDBERROR()})
  }
}

async function delete_(req: IReq, res: IRes) {
  const id = +(req.query as any).id;

  try{
    const deleteStatus = await TenistaService.delete(id);
    if (!deleteStatus){
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: errors.COULDNTFINDIDERROR(id.toString())})
    }
    return res.status(HttpStatusCodes.OK).end();
  } catch(err) {
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
