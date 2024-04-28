import request from 'supertest';
import app from '../../src/server'; 
import HttpStatusCodes from '../../src/constants/HttpStatusCodes'
import * as testVars from '../variables/TestVariables';

describe('Missing DB', () => {
    it('Is an error that happens usually because of bad pathing or a missing db file in the backend, unprovocable by the user. Were it to happen a 500 would be returned')
})

describe('GET Tests', () => {
    it('GET /api/tenistas should return all tenistas from the database and a 200', async () => {
        const response = await request(app).get('/api/tenistas');
        expect(response.status).toBe(HttpStatusCodes.OK);
        expect(response.body).toBeDefined()
    })
    it('GET /api/tenistas?id=1 should return tenista of id 1 and a 200', async () => {
        const response = await request(app).get('/api/tenistas');
        expect(response.status).toBe(HttpStatusCodes.OK);
        expect(response.body).toBeDefined()
    })
    it('GET /api/tenistas?id=55 should return a 500 since it doesn\'t exist', async () => {
        const response = await request(app).get('/api/tenistas');
        expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    })
})

describe('POST Tests', () => {
    it('POST /api/tenistas with a Tenista in the body should return a 201', async () => {
        const response = await request(app).post('/api/tenistas').send(testVars.testTenista1);
        expect(response.status).toBe(HttpStatusCodes.CREATED);
    })
    it('POST /api/tenistas should return a 400 if the Tenista object is faulty', async () => {
        const faultyTenista = {
            id: 1,
            nombre: "Banjo",
        }
        const response = await request(app).post('/api/tenistas').send(faultyTenista);
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
    it('POST /api/partidos without a Tenista in the body should return a 400', async () => {
        const response = await request(app).post('/api/tenistas')
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
})

describe('PATCH Tests', () => {
    it('PATCH /api/tenistas with a Tenista in the body and an existing id should return a 200', async () => {
        const response = await request(app).patch('/api/tenistas').send(testVars.testTenista1);
        expect(response.status).toBe(HttpStatusCodes.OK);
    })
    it('PATCH /api/tenistas should return a 400 if the Tenista object is faulty', async () => {
        const faultyTenista = {
            id: 1,
            nombre: "Banjo",
        }
        const response = await request(app).patch('/api/tenistas').send(faultyTenista);
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
    it('PATCH /api/tenistas should return a 500 if the Tenista.id doesn\'t exist', async () => {
        let faultyIdTenista = testVars.testTenista2
        faultyIdTenista.id = 230
        const response = await request(app).patch('/api/partidos').send(faultyIdTenista);
        expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    })
    it('POST /api/partidos without a Tenista in the body should return a 400', async () => {
        const response = await request(app).post('/api/tenistas')
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    })
})

describe('DELETE Tests', () => {
    it('DELETE /api/tenistas?id=' + testVars.testTenista1.id + 'should return a 200 if the id exists', async () => {
        const response = await request(app).delete('/api/tenistas?id=' + testVars.testTenista1.id).send(testVars.testTenista1);
        expect(response.status).toBe(HttpStatusCodes.OK);
    })
    it('DELETE /api/tenistas?id=230 should return a 500 if the id doesn\'t exist', async () => {
        const response = await request(app).delete('/api/tenistas?id=230').send(testVars.testTenista2);
        expect(response.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    })
})