const request = require("supertest");
const app = require("../src/app");

it("GET / should respond with correct API documentation", async done => {
  const { body } = await request(app)
    .get("/")
    .expect(200);
  const expected = {
    "0": "GET    /",
    "1": "POST   /jumplings/presenters",
    "2": "GET    /jumplings/presenters",
    "3": "-----------------------",
    "4": "GET    /jumplings",
    "5": "POST   /jumplings",
    "6": "GET /jumplings/:id",
    "7": "PUT /jumplings/:id",
    "8": "DELETE /jumplings/:id",
  };
  expect(body).toEqual(expected);
  done();
});
