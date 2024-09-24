import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { logger } from "@/app";

export function onResponseLogs(
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const { statusCode } = reply;

  if (statusCode >= 200 && statusCode <= 299) {
    logger.info({
      method: req.method,
      url: req.url,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
    });

    return done();
  }

  if (statusCode >= 400 && statusCode <= 499) {
    logger.warn({
      method: req.method,
      url: req.url,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
    });

    return done();
  }

  logger.error({
    method: req.method,
    url: req.url,
    statusCode: reply.statusCode,
    responseTime: reply.elapsedTime,
  });

  return done();
}
