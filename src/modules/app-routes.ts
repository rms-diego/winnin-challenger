import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", (_, res) =>
    res
      .status(200)
      .send({ message: "server is running", documentation: "/docs" }),
  );
}
