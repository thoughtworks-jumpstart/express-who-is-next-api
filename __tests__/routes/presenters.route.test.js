const request = require("supertest");
const app = require("../../src/app");

beforeEach(async () => {
  // as if we dropping database
  const agent = request(app);
  await agent.delete("/jumplings");
});

describe("/jumplings/presenters", () => {
  it("/GET should return no presenters when there are no presenters yet", async done => {
    const { body } = await request(app)
      .get("/jumplings/presenters")
      .expect(200);
    expect(body).toEqual([]);
    done();
  });

  it("/GET should return one presenter when one presenter has been POSTed", async done => {
    const expectedPresenters = [
      {
        id: 1,
        name: "Bob",
      },
    ];
    const agent = request(app);
    await agent.post("/jumplings").send(expectedPresenters[0]);
    await agent.post("/jumplings/presenters");
    const { body } = await agent.get("/jumplings/presenters");
    expect(body).toMatchObject(expectedPresenters);
    done();
  });

  it("/POST should generate a presenter", async done => {
    const expectedPresenters = [
      {
        id: 1,
        name: "Bobdddd",
      },
    ];
    const agent = request(app);
    await agent.post("/jumplings").send(expectedPresenters[0]);
    const { body } = await agent.post("/jumplings/presenters");
    expect(body).toMatchObject(expectedPresenters);
    done();
  });
});
