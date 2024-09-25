import { PrismaClient } from "@prisma/client";
import { CreateManyDTO } from "../@types";

export class RedditRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public createMany = async (data: CreateManyDTO) => {
    return this.prismaClient.posts.createMany({ data });
  };
}
