/* eslint-disable no-undef */
const request = require("supertest");
const db = require("../models/index");
const app = require("../app");

let server, agent;

describe("Todo test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("responds with json at /todos", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.id).toBeDefined();
  });

  test(" Mark a todo as completed", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.completed).toBe(false);
    const todoId = parsedResponse.id;

    const markResponse = await agent.put(`/todos/${todoId}/markAsCompleted`).send({
      completed: true,
    });

    expect(markResponse.statusCode).toBe(200);
    expect(markResponse.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );

    const parsedMarkResponse = JSON.parse(markResponse.text);
    expect(parsedMarkResponse.completed).toBe(true);

  }
  );
});
