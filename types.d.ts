// types.d.ts
import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    logStart: number;
  }
}
