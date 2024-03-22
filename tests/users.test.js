const request = require("supertest");
const app = require("../res/index");

describe("GET /", () => {
    it("responds with status code 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

    it("responds with hello word", async () => {
        const response = await request(app).get("/");
        expect(response.text).toBe("Hello World!");
    });
});

const ObjectToTest = {
    id: 3232,
    name: "Lucy",
    lastname: "Heartfield",
    email: "fairytal@gmail.com",
    password: "123456",
    rol: "usuario",
};

let id;

describe("Get /user", () => {
    it("responds some user", async () => {
        // Agregar un timeout de 10 segundos (10000 milisegundos)
        jest.setTimeout(30000);
        const response = await request(app).get("/user");
        // Verifica que el código de estado de la respuesta sea 200 (OK)
        expect(response.statusCode).toBe(200);

        // Verifica que el tipo de contenido de la respuesta sea JSON
        expect(response.headers["content-type"]).toMatch(/application\/json/);

        // Verifica que el campo 'status' esté presente en el cuerpo de la respuesta
        expect(response.body).toHaveProperty("status");

        // Verifica que el valor del campo 'status' sea 'success'
        expect(response.body.status).toBe("success");
    });

    it("responds with status 400 when sending invalid data", async () => {
        const response = await request(app)
            .post("/user")
            .send({ invalidObject: ObjectToTest });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});

describe("POST /user", () => {
    it("inser user in mongoose", async () => {
        const response = await request(app).post("/user").send(ObjectToTest);

        expect(response.body).toHaveProperty("rol");
        expect(response.body.name).toBe(newUser.name);
    });
});

describe("GET /user/:id", () => {
    beforeAll(() => {
        id = "1"; 
    });

    it("responds with status 200 and the user object", async () => {
        const response = await request(app).get(`/user/${id}`);

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("object");
        expect(response.body).toEqual(ObjectToTest);
    });

    it("responds with status 404 when trying to get a non-existing user", async () => {
        const response = await request(app).get("/user/xxxxx");

        expect(response.status).toBe(404);
    });
});

describe("POST /login", () => {
    it("responds with status 200 and a token when logging in with valid credentials", async () => {
        const response = await request(app).post("/login").send(ObjectToTest);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    it("responds with status 400 when logging in with invalid credentials", async () => {
        const response = await request(app).post("/login").send({
            "email": "kevinshe01@gmail.com",
            "password": "<PASSWORD>",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});

describe("POST /delete", () => {
    it("responds with status 200 when deleting a user with a valid id", async () => {
        id = "6";

        const response = await request(app).delete(`/user/${id}`);
        expect(response.status).toBe(200);
    });

    it("responds with status 404 when trying to delete a non-existing user", async () => {
        const response = await request(app).delete("/user/xxxx");

        expect(response.status).toBe(404);
    });
});
