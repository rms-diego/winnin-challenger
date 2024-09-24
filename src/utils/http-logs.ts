import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { logger } from "@/app";

export function logsHook(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  logger.info(
    {
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
    },
    "HTTP Transaction",
  );
  done();
}
