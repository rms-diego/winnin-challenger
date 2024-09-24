import { app } from "@/app";
import { env } from "@/utils/env";
import { logger } from "./app";

async function main() {
  const address = await app.listen({ port: env.PORT });

  logger.info("Server is running 🚀");
  logger.info(`link: ${address}\n`);
}

main();
