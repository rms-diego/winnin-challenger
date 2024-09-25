import { FastifyInstance } from "fastify";
import { redditRoutes } from "./reddit";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", (_, res) =>
    res.status(200).send({
      message: "server is running",
      documentation: "/docs",
    }),
  );

  app.register(redditRoutes, { prefix: "posts" });
}
