import "dotenv/config";
import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import apiDocs from "@docs/api-docs.json";

import fastifyApiReference from "@scalar/fastify-api-reference";

import { errorMiddleware } from "@/middleware/error-middleware";
import { appRoutes } from "@/modules/app-routes";
import { onRequest, onResponse } from "@/utils/http-logs";

const app = fastify();

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

// http middlewares
app.addHook("onRequest", onRequest);
app.addHook("onResponse", onResponse);

app.setErrorHandler(errorMiddleware);
app.register(appRoutes);

export { app };
