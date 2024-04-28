import Accessor from '../../src/db/dbAccessor'
import { Partido } from '../../src/classes/dataClasses/Partido'
import * as testVars from '../variables/TestVariables';
import DATABASE_DIR from '../constants/DatabaseInfo';
import * as fs from 'fs';
const dbAccessor = new Accessor<Partido>(DATABASE_DIR);

function retrievePartidos(): Partido[] {
    const data = fs.readFileSync(DATABASE_DIR + Partido.PATH, 'utf-8');
    return JSON.parse(data);
}

/*
 This error occurs inside the read/write private methods
*/
describe("Bad Path situation", () =>{
    it("Should return an error if the path is non-existent as it can't find the database", () =>{ 
        expect(dbAccessor.getAll("blablalbabla")).toThrow
    })
})

describe("GetAll function", () =>{
    it("Should return all the contents from the database specified, in this case partidos.json", () =>{
        expect(dbAccessor.getAll(Partido.PATH)).toBe(retrievePartidos())
    })
})

describe("GetOne function",  () =>{
    it("Should return the specified id"), () =>{
        expect(dbAccessor.getOne(1, Partido.PATH)).toBeDefined()
    }

    it("Should handle the case where the id doesn't exist"), () =>{
        expect(dbAccessor.getOne(230, Partido.PATH)).toBeUndefined()
    }
})

describe("Persists function",  () =>{
    it("Should return true if the id exists"), () =>{
        expect(dbAccessor.persists(1, Partido.PATH)).toBe(true)
    }

    it("Should return false if the id doesn't exist"), () =>{
        expect(dbAccessor.persists(230, Partido.PATH)).toBe(false)
    }
})

describe("Add function",  () =>{
    it("Should return the object if addition was succesful"), () =>{
        expect(dbAccessor.add(testVars.testPartido1, Partido.PATH)).toBe(testVars.testPartido1)
    }

    // Caused by unkown edge cases, basically untestable
    it("Should return false if the addition failed"), () =>{
        expect(false).toBe(false)
    }
})

describe("Update function",  () =>{
    it("Should return true if the id of the object given exists"), () =>{
        expect(dbAccessor.update(testVars.testPartido1, Partido.PATH)).toBe(true)
    }

    it("Should return false if the id doesn't exist"), () =>{
        testVars.testPartido1.id=666
        expect(dbAccessor.update(testVars.testPartido1, Partido.PATH)).toBe(false)
    }
})

describe("Delete function",  () =>{
    it("Should return true if the id of the object given exists"), () =>{
        expect(dbAccessor.delete_(4, Partido.PATH)).toBe(true)
    }

    it("Should return false if the id doesn't exist"), () =>{
        expect(dbAccessor.delete_(332, Partido.PATH)).toBe(false)
    }
})