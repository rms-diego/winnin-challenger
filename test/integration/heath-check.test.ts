import { describe, test, expect, beforeAll } from "vitest";
import supertest from "supertest";
import { app } from "@/app";

describe("GET / - Health check test cases", () => {
  const request = supertest(app.server);

  beforeAll(async () => {
    app.ready();
  });

  test("it should be able to get health check message", async () => {
    const { body } = await request.get("/").expect(200);

    expect(body.message).toBeDefined();
    expect(body.message).toBe("server is running");

    expect(body.documentation).toBeDefined();
    expect(body.documentation).toBe("/docs");

    expect(body.instanceId).toBeDefined();
    expect(typeof body.instanceId).toBe("string");
  });
});
