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

  logger.info("Connected to postgres");
  await app.listen({ host: "0.0.0.0", port: env.PORT });

  // cron job
  // cron.schedule("*/10 * * * *", async () =>
  //   redditService.fetchPostsFromReddit(),
  // );

  // cron.schedule("*/1 * * * *", async () =>
  //   redditService.fetchPostsFromReddit(),
  // );
  cron.schedule("0 0 * * *", async () => redditService.fetchPostsFromReddit());
}

main();
