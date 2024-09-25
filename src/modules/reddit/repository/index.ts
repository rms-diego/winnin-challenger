import { PrismaClient } from "@prisma/client";
import { CreateManyDTO, FindPostsInRangeDTO } from "../@types";

export class RedditRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public createMany = async (data: CreateManyDTO) => {
    return this.prismaClient.posts.createMany({ data });
  };

  public findPostsInRange = async (params: FindPostsInRangeDTO) => {
    const postsFound = await this.prismaClient.posts.findMany({
      where: {
        createdAt: { gte: params.startedAt, lte: params.finishedAt },
      },
      orderBy: { [params.sortBy]: "desc" },
    });

    return postsFound;
  };
}
