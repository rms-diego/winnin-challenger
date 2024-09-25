import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { Exception } from "@/utils/exception";

export function errorMiddleware(
  err: FastifyError | ZodError | Exception,
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  if (err instanceof ZodError) {
    const formatErrorMessage = err.errors.map((issue) => ({
      property: issue.path.join(),
      message: issue.message,
    }));

    return reply.status(400).send({ error: formatErrorMessage });
  }

  if (err instanceof Exception) {
    return reply.status(err.statusCode).send({ error: err.message });
  }

  return reply.status(500).send({ error: err.message });
}
