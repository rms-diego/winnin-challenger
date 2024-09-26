import { describe, test, expect, vi } from "vitest";
import { PrismaClient } from "@prisma/client";

import {
  mockDataCreateManyRepository,
  mockFindManyPosts,
  mockFindPostsInRange,
  mockPostsFound,
} from "@test/mocks";
import { RedditRepository } from "@/modules/reddit/repository";

describe("Unit tests reddit repository", () => {
  const prismaClientMock = {
    posts: {
      findMany: vi.fn().mockImplementation(() => mockPostsFound),
      createMany: vi.fn().mockImplementation(() => {}),
    },
  } as unknown as PrismaClient;

  const redditRepository = new RedditRepository(prismaClientMock);

  describe("createMany method tests cases", () => {
    test("It should be able to call create many", async () => {
      await redditRepository.createMany(mockDataCreateManyRepository);

      expect(prismaClientMock.posts.createMany).toHaveBeenCalledWith({
        data: mockDataCreateManyRepository,
      });
    });
  });

  describe("findPostsInRange method tests cases", () => {
    test("It should be able to call findPostsInRange", async () => {
      await redditRepository.findPostsInRange(mockFindPostsInRange);

      expect(prismaClientMock.posts.findMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            gte: mockFindPostsInRange.startedAt,
            lte: mockFindPostsInRange.finishedAt,
          },
        },
        orderBy: { [mockFindPostsInRange.sortBy]: "desc" },
        take: mockFindPostsInRange.postsQuantity,
        skip: mockFindPostsInRange.skippedPosts,
      });
    });
  });

  describe("findManyPosts method tests cases", () => {
    test("It should be able to call findPostsInRange", async () => {
      await redditRepository.findManyPosts(mockFindManyPosts);

      expect(prismaClientMock.posts.findMany).toHaveBeenCalledWith({
        orderBy: { [mockFindManyPosts.sortBy]: "desc" },
        take: mockFindManyPosts.postsQuantity,
        skip: mockFindManyPosts.skippedPosts,
      });
    });
  });
});
