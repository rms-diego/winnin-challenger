import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { Exception } from "@/utils/exception";

export function errorMiddleware(
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  if (err instanceof Exception) {
    return reply.status(err.statusCode).send({ error: err.message });
  }

  return reply.status(500).send({ error: err.message });
}
