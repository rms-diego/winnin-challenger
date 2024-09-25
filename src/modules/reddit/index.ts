import { FastifyInstance } from "fastify";
import { prisma } from "@/utils/prisma";

import { RedditRepository } from "./repository";
import { RedditService } from "./service";
import { RedditController } from "./controller";

const redditRepository = new RedditRepository(prisma);
const redditService = new RedditService(redditRepository);
const redditController = new RedditController(redditService);

async function redditRoutes(app: FastifyInstance) {
  app.get("/", redditController.findPostsInRange);
}

export { redditRepository, redditService, redditRoutes };
