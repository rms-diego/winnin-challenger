import "dotenv/config";
import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import apiDocs from "@docs/api-docs.json";

import fastifyApiReference from "@scalar/fastify-api-reference";

import { loggerConfig } from "@/utils/logger-config";
import { errorMiddleware } from "@/middleware/error-middleware";
import { appRoutes } from "@/modules/app-routes";
import { onResponseLogs } from "@/utils/http-logs";

const app = fastify({ logger: loggerConfig, disableRequestLogging: true });
const logger = app.log;

app.register(helmet, { global: true });
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

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
