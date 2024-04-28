import request from 'supertest';
import app from '../../src/server'; 
import HttpStatusCodes from '../../src/constants/HttpStatusCodes'
import * as testVars from '../variables/TestVariables';

describe('Missing DB', () => {
    it('Is an error that happens usually because of bad pathing or a missing db file in the backend, unprovocable by the user. Were it to happen a 500 would be returned')
})

describe('GET Tests', () => {
    it('GET /api/partidos should return all partidos from the database and a 200', async () => {
        const response = await request(app).get('/api/partidos');
        expect(response.status).toBe(HttpStatusCodes.OK);
        expect(response.body).toBeDefined()
    })
    it('GET /api/partidos?id=1 should return tenista of id 1 and a 200', async () => {
        const response = await request(app).get('/api/partidos');
        expect(response.status).toBe(HttpStatusCodes.OK);
        expect(response.body).toBeDefined()
    })
    it('GET /api/partidos?id=55 should return a 500 since it doesn\'t exist', async () => {
        const response = await request(app).get('/api/partidos');
        expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    })
})

describe('POST Tests', () => {
    it('POST /api/partidos with a Partido in the body should return a 201', async () => {
        const response = await request(app).post('/api/partidos').send(testVars.testPartido2);
        expect(response.status).toBe(HttpStatusCodes.CREATED);
    })
    it('POST /api/partidos should return a 400 if the Partido object is faulty', async () => {
        const faultyPartido = {
            id: 1,
            nombre: "Banjo",
        }
        const response = await request(app).post('/api/partidos').send(faultyPartido);
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
    it('POST /api/partidos with a Partido in the body but the Tenistas are not in the database should return a 400', async () => {
        const response = await request(app).post('/api/partidos').send(testVars.testPartido1);
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
    it('POST /api/partidos without a Partido in the body should return a 400', async () => {
        const response = await request(app).post('/api/partidos')
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
})

describe('PATCH Tests', () => {
    it('PATCH /api/partidos with a Partido in the body should return a 201', async () => {
        const response = await request(app).patch('/api/partidos').send(testVars.testPartido2);
        expect(response.status).toBe(HttpStatusCodes.CREATED);
    })
    it('PATCH /api/partidos should return a 400 if the Partido object is faulty', async () => {
        const faultyPartido = {
            id: 1,
            nombre: "Banjo",
        }
        const response = await request(app).patch('/api/partidos').send(faultyPartido);
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
    it('PATCH /api/partidos should return a 500 if the Partidos.id doesn\'t exist', async () => {
        let faultyIdPartido = testVars.testPartido2
        faultyIdPartido.id = 230
        const response = await request(app).patch('/api/partidos').send(faultyIdPartido);
        expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    })
    it('PATCH /api/partidos with a Partido in the body but the Tenistas are not in the database should return a 400', async () => {
        const response = await request(app).patch('/api/partidos').send(testVars.testPartido1);
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
    it('PATCH /api/partidos without a Partido in the body should return a 400', async () => {
        const response = await request(app).patch('/api/partidos')
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
})

describe('DELETE Tests', () => {
    it('DELETE /api/partidos?id=' + testVars.testPartido1.id + 'should return a 200 if the id exists', async () => {
        const response = await request(app).delete('/api/partidos?id=' + testVars.testPartido1.id).send(testVars.testPartido1);
        expect(response.status).toBe(HttpStatusCodes.OK);
    })
    it('DELETE /api/partidos?id=230 should return a 500 if the id doesn\'t exist', async () => {
        const response = await request(app).delete('/api/partidos?id=230').send(testVars.testPartido2);
        expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    })
})