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

  await app.listen({ host: "0.0.0.0", port: env.PORT });
  logger.info("Connected to postgres\n");

  // cron job
  cron.schedule("*/1 * * * *", () => redditService.fetchPostsFromReddit());
  // cron.schedule("0 0 * * *", () => redditService.fetchPostsFromReddit());
}

main();
