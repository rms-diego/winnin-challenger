import { app } from "@/app";
import { env } from "@/utils/env";
import { logger } from "./app";

async function main() {
  await app.listen({ port: env.PORT });

  logger.info("Server is running 🚀\n");
}

main();
