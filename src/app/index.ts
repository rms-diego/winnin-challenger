import "dotenv/config";
import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import apiDocs from "@docs/api-docs.json";

import fastifyApiReference from "@scalar/fastify-api-reference";

import { errorMiddleware } from "@/middleware/error-middleware";
import { appRoutes } from "@/modules/app-routes";
import { onResponseLogs } from "@/utils/http-logs";

const app = fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
        singleLine: true,
      },
    },
  },
  disableRequestLogging: true,
});
const logger = app.log;

app.register(helmet, { global: true });
app.register(cors);

app.register(fastifyApiReference, {
  routePrefix: "/docs",
  configuration: {
    title: "Example API doc",
    spec: {
      content: apiDocs,
    },
  },
});

app.addHook("onResponse", onResponseLogs);
app.setErrorHandler(errorMiddleware);
app.register(appRoutes);

export { app, logger };
