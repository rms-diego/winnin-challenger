import { FastifyReply, FastifyRequest } from "fastify";
import { RedditService } from "../service";
import { findManyPostsSchema, findPostsInRangeSchema } from "../@types";

export class RedditController {
  constructor(private readonly redditService: RedditService) {}

  public findPostsInRange = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> => {
    const { startedAt, finishedAt, sortBy, postsQuantity } =
      findPostsInRangeSchema.parse(req.query);

    const posts = await this.redditService.findPostsInRange({
      startedAt,
      finishedAt,
      sortBy,
      postsQuantity,
    });

    return reply.status(200).send(posts);
  };

  public findMany = async (
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> => {
    const { sortBy, postsQuantity } = findManyPostsSchema.parse(req.query);

    const posts = await this.redditService.findManyPosts({
      sortBy,
      postsQuantity,
    });

    return reply.status(200).send(posts);
  };
}
