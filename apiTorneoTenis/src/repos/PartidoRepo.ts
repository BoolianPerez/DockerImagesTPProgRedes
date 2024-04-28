import { Partido } from '@src/classes/dataClasses/Partido';
import DATABASE_DIR from '@src/constants/DatabaseInfo';
import Accessor from '@src/db/dbAccessor';

const dbAccessor = new Accessor<Partido>(DATABASE_DIR);

async function getOne(id: number): Promise<Partido | undefined> {
  try{
    return dbAccessor.getOne(id, Partido.PATH)
  } catch(err) {
    throw err
  }
}

async function persists(id: number): Promise<boolean> {
  try{
    return dbAccessor.getOne(id, Partido.PATH) != undefined;
  } catch(err) {
    throw err
  }
}

async function getAll(): Promise<Partido[]> {
  try{
    return dbAccessor.getAll(Partido.PATH);
  } catch(err) {
    throw err
  }
}

async function add(partido: Partido): Promise<boolean | Partido> {   
  try{
    return dbAccessor.add(partido, Partido.PATH)
  } catch(err) {
    throw err
  }
}

async function update(partido: Partido): Promise<boolean> {
  try{
    return dbAccessor.update(partido, Partido.PATH)
  } catch(err) {
    throw err
  }
}

async function delete_(id: number): Promise<boolean> {
  try{
    return dbAccessor.delete_(id, Partido.PATH)
  } catch(err) {
    throw err
  }

}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
