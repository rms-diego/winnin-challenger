import { PrismaClient, posts as Posts } from "@prisma/client";
import {
  CreateManyDTO,
  FindPostsInRangeRepositoryDTO,
  FindManyPostsRepositoryDTO,
} from "../@types";

export class RedditRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public createMany = async (data: CreateManyDTO): Promise<void> => {
    await this.prismaClient.posts.createMany({ data });
  };

  public findPostsInRange = async (
    params: FindPostsInRangeRepositoryDTO,
  ): Promise<Posts[]> => {
    const postsFound = await this.prismaClient.posts.findMany({
      where: {
        createdAt: { gte: params.startedAt, lte: params.finishedAt },
      },
      orderBy: { [params.sortBy]: "desc" },
      take: params.postsQuantity,
      skip: params.skippedPosts,
    });

    return postsFound;
  };

  public findManyPosts = async (
    params: FindManyPostsRepositoryDTO,
  ): Promise<Posts[]> => {
    const postsFound = await this.prismaClient.posts.findMany({
      orderBy: { [params.sortBy]: "desc" },
      take: params.postsQuantity,
      skip: params.skippedPosts,
    });

    return postsFound;
  };
}
