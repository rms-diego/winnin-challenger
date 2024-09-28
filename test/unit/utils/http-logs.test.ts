import { describe, expect, vi, test, beforeEach } from "vitest";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { logger } from "@/app";
import { env } from "@/utils/env";
import { onResponseLogs } from "@/utils/http-logs";

describe("Unit test cases for http logs", () => {
  let req: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;
  let done: HookHandlerDoneFunction;

  beforeEach(() => {
    req = { method: "GET", url: "/test" };
    reply = { statusCode: 200, elapsedTime: 50 };

    done = vi.fn();

    vi.spyOn(logger, "info").mockImplementation(() => {});
    vi.spyOn(logger, "warn").mockImplementation(() => {});
    vi.spyOn(logger, "error").mockImplementation(() => {});
  });

  test("should not log when NODE_ENV is 'test'", () => {
    env.NODE_ENV = "test";

    onResponseLogs(req as FastifyRequest, reply as FastifyReply, done);

    expect(done).toHaveBeenCalled();
    expect(logger.info).not.toHaveBeenCalled();
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  test("should not log for redirection responses (300 to 399)", () => {
    env.NODE_ENV = "production";
    reply.statusCode = 302;
    onResponseLogs(req as FastifyRequest, reply as FastifyReply, done);
    expect(done).toHaveBeenCalled();
    expect(logger.info).not.toHaveBeenCalled();
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  test("should log info for successful responses (200 to 299)", () => {
    env.NODE_ENV = "production";
    reply.statusCode = 200;

    onResponseLogs(req as FastifyRequest, reply as FastifyReply, done);

    expect(done).toHaveBeenCalled();

    expect(logger.info).toHaveBeenCalledWith({
      method: req.method,
      url: req.url,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
      date: expect.any(Date),
    });
  });

  test("should log warn for client error responses (400 to 499)", () => {
    env.NODE_ENV = "production";
    reply.statusCode = 404;
    onResponseLogs(req as FastifyRequest, reply as FastifyReply, done);

    expect(done).toHaveBeenCalled();

    expect(logger.warn).toHaveBeenCalledWith({
      method: req.method,
      url: req.url,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
      date: expect.any(Date),
    });
  });

  test("should log error for server error responses (500 to 599)", () => {
    env.NODE_ENV = "production";
    reply.statusCode = 500;

    onResponseLogs(req as FastifyRequest, reply as FastifyReply, done);

    expect(done).toHaveBeenCalled();

    expect(logger.error).toHaveBeenCalledWith({
      method: req.method,
      url: req.url,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
      date: expect.any(Date),
    });
  });
});
