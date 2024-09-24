import "dotenv/config";
import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import apiDocs from "@docs/api-docs.json";

import fastifyApiReference from "@scalar/fastify-api-reference";

import { errorMiddleware } from "@/middleware/error-middleware";
import { appRoutes } from "@/modules/app-routes";
import { logsHook } from "@/utils/http-logs";

const app = fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss.l",
        ignore: "pid,hostname",
        singleLine: true,
      },
    },
  },
  disableRequestLogging: true,
});

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

app.setErrorHandler(errorMiddleware);
app.addHook("onResponse", logsHook);
app.register(appRoutes);

const logger = app.log;

export { app, logger };
