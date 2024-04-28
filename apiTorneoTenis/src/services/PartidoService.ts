import PartidoRepo from '@src/repos/PartidoRepo';
import { Partido } from '@src/classes/dataClasses/Partido';

function getAll(): Promise<Partido[]> {
  try{
    return PartidoRepo.getAll();
  } catch(err) {
    throw err
  }
}

function getOne(id: number): Promise<Partido | undefined>{
  try{
    return PartidoRepo.getOne(id);
  } catch(err) {
    throw err
  }
}

function addOne(partido: Partido): Promise<boolean | Partido> {
  try{
    return PartidoRepo.add(partido);
  } catch(err) {
    throw err
  }
}

async function updateOne(partido: Partido): Promise<boolean> {
  try{
    return PartidoRepo.update(partido);
  } catch(err) {
    throw err
  }
}

async function _delete(id: number): Promise<boolean> {
  try{
    return PartidoRepo.delete(id);
  } catch(err) {
    throw err
  }
}

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
