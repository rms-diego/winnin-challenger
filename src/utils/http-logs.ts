import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { logger } from "@/app";
import { env } from "./env";

export function onResponseLogs(
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const { NODE_ENV } = env;
  if (NODE_ENV === "test") return done();

  const { statusCode } = reply;

  const logData = {
    method: req.method,
    url: req.url,
    statusCode: reply.statusCode,
    responseTime: reply.elapsedTime,
    date: new Date(),
  };

  if (statusCode >= 300 && statusCode <= 399) return done();

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
