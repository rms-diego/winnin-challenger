import { RedditService } from "./service";
import { RedditRepository } from "./repository";
import { prisma } from "@/utils/prisma";

const redditRepository = new RedditRepository(prisma);
const redditService = new RedditService(redditRepository);

// singleton repository and singleton service
export { redditRepository, redditService };
