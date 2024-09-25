import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { redditRoutes } from "./reddit";

const instanceId = randomUUID();

export async function appRoutes(app: FastifyInstance) {
  app.get("/", (_, res) =>
    res.status(200).send({
      message: "server is running",
      documentation: "/docs",
      instanceId,
    }),
  );

  app.register(redditRoutes, { prefix: "posts" });
}
