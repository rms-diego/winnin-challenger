import cron from "node-cron";
import { app } from "@/app";
import { env } from "@/utils/env";
import { logger } from "./app";
import { prisma } from "./utils/prisma";

import { redditService } from "@/modules/reddit";

async function main() {
  const ping = await prisma.$queryRaw`SELECT 'ping'`;
  if (!ping) {
    throw new Error("Make sure your database server is running");
  }

  await app.listen({ port: env.PORT });
  logger.info("Connected to postgres\n");

  // cron jobs
  cron.schedule("*/1 * * * *", () => redditService.fetchPostsFromReddit());

  // Cron job que dispara a cada 12 horas
  // cron.schedule("0 */12 * * *", () => {
  //   console.log("Tarefa executada a cada 12 horas");
  // });
}

main();
