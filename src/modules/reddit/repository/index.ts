import { PrismaClient, posts as Posts } from "@prisma/client";
import {
  CreateManyDTO,
  FindManyPostsDTO,
  FindPostsInRangeDTO,
} from "../@types";

export class RedditRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public createMany = async (data: CreateManyDTO): Promise<void> => {
    await this.prismaClient.posts.createMany({ data });
  };

  public findPostsInRange = async (
    params: FindPostsInRangeDTO,
  ): Promise<Posts[]> => {
    const postsFound = await this.prismaClient.posts.findMany({
      where: {
        createdAt: { gte: params.startedAt, lte: params.finishedAt },
      },
      orderBy: { [params.sortBy]: "desc" },
      take: 100,
    });

    return postsFound;
  };

  public findManyPosts = async (params: FindManyPostsDTO): Promise<Posts[]> => {
    const postsFound = await this.prismaClient.posts.findMany({
      orderBy: { [params.sortBy]: "desc" },
      take: 100,
    });

    return postsFound;
  };
}
