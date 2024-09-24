import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { logger } from "./logger";
import { env } from "./env";

export function onRequest(
  req: FastifyRequest,
  _: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const { NODE_ENV } = env;
  if (NODE_ENV === "test") {
    return done();
  }

  req.logStart = Date.now();
  return done();
}

export function onResponse(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const { method, url } = request.raw;
  const { statusCode } = reply;
  const responseTime = Date.now() - request.logStart;

  const { NODE_ENV } = env;
  if (NODE_ENV === "test") {
    return done();
  }

  if (statusCode >= 400) {
    return done();
  }

  logger.info(`${method} ${url} ${statusCode} - ${responseTime}ms`);
  done();
}
