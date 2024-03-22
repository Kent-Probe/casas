const request = require('supertest')
const app = require('../res/index')

describe('GET /', () => {
    it('responds with status code 200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    })

    it('responds with hello word', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello World!');
    })
})

describe('Get /user', () => {
    it('responds some user', async () => {
        // Agregar un timeout de 10 segundos (10000 milisegundos)
        jest.setTimeout(30000);  
        const response = await request(app).get('/user');
        // Verifica que el código de estado de la respuesta sea 200 (OK)
        expect(response.statusCode).toBe(200);

        // Verifica que el tipo de contenido de la respuesta sea JSON
        expect(response.headers['content-type']).toMatch(/application\/json/);

        // Verifica que el campo 'status' esté presente en el cuerpo de la respuesta
        expect(response.body).toHaveProperty('status');

        // Verifica que el valor del campo 'status' sea 'success'
        expect(response.body.status).toBe('success');
    })
})

describe('Post /user', () => {
    it('inser user in mongoose', async () => {
        const newUser = {
            "id": 3232,
            "name": "Lucy",
            "lastname": "Heartfield",
            "email": "fairytal@gmail.com",
            "password": "123456",
            "rol": "usuario"
        }

        const response = await request(app).post('/user').send(newUser);
        
        expect(response.body).toHaveProperty('rol');
        expect(response.body.name).toBe(newUser.name);
    })
})