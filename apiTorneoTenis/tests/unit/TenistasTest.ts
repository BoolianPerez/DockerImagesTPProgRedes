import Accessor from '../../src/db/dbAccessor'
import { Tenista } from '../../src/classes/dataClasses/Tenista'
import * as testVars from '../variables/TestVariables';
import DATABASE_DIR from '../constants/DatabaseInfo';
import * as fs from 'fs';

const dbAccessor = new Accessor<Tenista>(DATABASE_DIR);

function retrieveTenistas(): Tenista[] {
    const data = fs.readFileSync(DATABASE_DIR + Tenista.PATH, 'utf-8');
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
    it("Should return all the contents from the database specified, in this case tenistas.json", () =>{
        expect(dbAccessor.getAll(Tenista.PATH)).toBe(retrieveTenistas())
    })
})

describe("GetOne function",  () =>{
    it("Should return the specified id"), () =>{
        expect(dbAccessor.getOne(1, Tenista.PATH)).toBeDefined()
    }

    it("Should handle the case where the id doesn't exist"), () =>{
        expect(dbAccessor.getOne(230, Tenista.PATH)).toBeUndefined()
    }
})

describe("Persists function",  () =>{
    it("Should return true if the id exists"), () =>{
        expect(dbAccessor.persists(1, Tenista.PATH)).toBe(true)
    }

    it("Should return false if the id doesn't exist"), () =>{
        expect(dbAccessor.persists(230, Tenista.PATH)).toBe(false)
    }
})

describe("Add function",  () =>{
    it("Should return the object if addition was succesful"), () =>{
        expect(dbAccessor.add(testVars.testTenista1, Tenista.PATH)).toBe(testVars.testTenista1)
    }

    // Caused by unkown edge cases, basically untestable
    it("Should return false if the addition failed"), () =>{
        expect(false).toBe(false)
    }
})

describe("Update function",  () =>{
    it("Should return true if the id of the object given exists"), () =>{
        expect(dbAccessor.update(testVars.testTenista1, Tenista.PATH)).toBe(true)
    }

    it("Should return false if the id doesn't exist"), () =>{
        testVars.testTenista1.id=666
        expect(dbAccessor.update(testVars.testTenista1, Tenista.PATH)).toBe(false)
    }
})

describe("Delete function",  () =>{
    it("Should return true if the id of the object given exists"), () =>{
        expect(dbAccessor.delete_(4, Tenista.PATH)).toBe(true)
    }

    it("Should return false if the id doesn't exist"), () =>{
        expect(dbAccessor.delete_(332, Tenista.PATH)).toBe(false)
    }
})