import { FastifyReply, FastifyRequest } from "fastify";
import { RedditService } from "../service";
import { findPostsInRangeSchema } from "../@types";

export class RedditController {
  constructor(private readonly redditService: RedditService) {}

  public findPostsInRange = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> => {
    const { startedAt, finishedAt, sortBy } = findPostsInRangeSchema.parse(
      req.query,
    );

    const posts = await this.redditService.findPostsInRange({
      startedAt,
      finishedAt,
      sortBy,
    });

    return reply.status(200).send(posts);
  };
}
