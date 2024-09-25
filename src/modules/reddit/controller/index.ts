import { FastifyReply, FastifyRequest } from "fastify";
import { RedditService } from "../service";
import { findManyPostsSchema, findPostsInRangeSchema } from "../@types";

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

  public findMany = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> => {
    const { sortBy } = findManyPostsSchema.parse(req.query);

    const posts = await this.redditService.findManyPosts({ sortBy });

    return reply.status(200).send(posts);
  };
}
