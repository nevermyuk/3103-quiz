// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app");

describe("GET / ", () => {
  test("It should respond", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("It should respond", async () => {
    const response = await request(app).post("/login");
    expect(response.statusCode).toBe(200);
  });
});

describe("Login fail", () => {
  // Hidden for simplicity
  test("POST /login", (done) => {
    request(app).post("/login").expect("Content-Type", /json/).send({
      username: "darkside",
      password: "darkside",
    });
    expect(302, done);
  });
  // More things come here
});
