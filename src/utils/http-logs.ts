import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { logger } from "@/app";

export function onResponseLogs(
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const { statusCode } = reply;

  const currentDate = new Date();

  const logData = {
    method: req.method,
    url: req.url,
    statusCode: reply.statusCode,
    responseTime: reply.elapsedTime,
    date: currentDate,
  };

  if (statusCode >= 200 && statusCode <= 299) {
    logger.info(logData);
    return done();
  }

  if (statusCode >= 400 && statusCode <= 499) {
    logger.warn(logData);
    return done();
  }

  logger.error(logData);
  return done();
}
