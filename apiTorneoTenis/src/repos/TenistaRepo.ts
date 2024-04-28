import { Tenista } from '@src/classes/dataClasses/Tenista';
import DATABASE_DIR from '@src/constants/DatabaseInfo';
import Accessor from '@src/db/dbAccessor';

const dbAccessor = new Accessor<Tenista>(DATABASE_DIR);

async function getOne(id: number): Promise<Tenista | undefined> {
  try{
    return dbAccessor.getOne(id, Tenista.PATH)
  }
  catch(err){
    throw err
  }
}

async function persists(id: number): Promise<boolean> {
  try{
    return dbAccessor.getOne(id, Tenista.PATH) != undefined;
  }
  catch(err){
    throw err
  }
}

async function getAll(): Promise<Tenista[]> {
  try{
    return dbAccessor.getAll(Tenista.PATH);
  }
  catch(err){
    throw err
  }
}

async function add(tenista: Tenista): Promise<boolean | Tenista> {
  try{
    return dbAccessor.add(tenista, Tenista.PATH)
  }catch(err){
    throw err
  }
}

async function update(tenista: Tenista): Promise<boolean> {
  try{
    return dbAccessor.update(tenista, Tenista.PATH)
  }catch(err){
    throw err
  }
}

async function delete_(id: number): Promise<boolean> {
  try{
    return dbAccessor.delete_(id, Tenista.PATH)
  }
  catch(err){
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
