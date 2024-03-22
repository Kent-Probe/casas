const request = require('supertest'); 
const app = require('../res/index.js');

const ObjectToTest = {
    "address": "123 Main St",
    "city": "Bogota",
    "state": "Bogota DC",
    "size": 200,
    "type": "Casa",
    "zipcode": 12345,
    "rooms": 3,
    "bathrooms": 2,
    "parking": true,
    "price": 420000000,
    "code": "GGGG1111"
};

let id;

describe("POST /houses", () => {
    it('responds with status 200 when creating a new house', async () => {
        const response = await request(app).post('/house').send(ObjectToTest);

        expect(response.status).toBe(200);
    });

    it('responds with status 400 when sending invalid data', async () => {
        const response = await request(app).post('/house').send({ invalidObject: ObjectToTest });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('GET /house',() => {
    it('responds with status 200 and an array of houses', async () => {
        const response = await request(app).get('/house');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('responds with an array containing the test house', async () => {
        const response = await request(app).get('/house');

        expect(response.body).toContainEqual(ObjectToTest);
    });
});

describe("GET /house/:id", () => {
    beforeAll(() => {
        id = "65fb8c3b5286999610f39c26";
    });

    it('responds with status 200', async () => {
        const response = await request(app).get(`/house/${id}`);

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body).toEqual(ObjectToTest);
    });

    it('responds with status 404 when trying to get a non-existing house', async () => {
        const response = await request(app).get('/house/xxxx');
        expect(response.status).toBe(404);
    });
});

describe('POST /delete', () => {
    it('responds with status 200 when deleting a house with a valid id', async () => {
        id = "65fb8c3b5286999610f39c26";

        const response = await request(app).delete(`/house/${id}`);
        expect(response.status).toBe(200);
    });

    it('responds with status 404 when trying to delete a non-existing house', async () => {
        const response = await request(app).delete('/house/xxxx');

        expect(response.status).toBe(404);
    });
});