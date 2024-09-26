import { FastifyReply, FastifyRequest } from "fastify";
import { describe, test, expect, vi } from "vitest";

import {
  mockFindManyPosts,
  mockFindPostsInRange,
  mockPostsFound,
} from "@test/mocks";
import { RedditService } from "@/modules/reddit/service";
import { RedditController } from "@/modules/reddit/controller";

describe("Unit tests reddit controller", () => {
  const redditServiceMock = {
    findPostsInRange: vi.fn().mockImplementation(() => mockPostsFound),
    findManyPosts: vi.fn().mockImplementation(() => mockPostsFound),
  } as unknown as RedditService;

  const mockRequest = {
    query: {},
  } as unknown as FastifyRequest;

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  } as unknown as FastifyReply;

  const redditController = new RedditController(redditServiceMock);

  describe("findPostsInRange tests case", () => {
    test("It should be able called findPostsInRange", async () => {
      mockRequest.query = {
        ...mockFindPostsInRange,
        startedAt: new Date(mockFindPostsInRange.startedAt).toISOString(),
        finishedAt: new Date(mockFindPostsInRange.finishedAt).toISOString(),
      };

      await redditController.findPostsInRange(mockRequest, mockReply);

      expect(mockReply.status).toBeCalled();
      expect(mockReply.status).toBeCalledWith(200);

      expect(mockReply.send).toBeCalled();
    });
  });

  describe("findMany tests case", () => {
    test("It should be able called findMany", async () => {
      mockRequest.query = {
        ...mockFindManyPosts,
      };

      await redditController.findMany(mockRequest, mockReply);

      expect(mockReply.status).toBeCalled();
      expect(mockReply.status).toBeCalledWith(200);

      expect(mockReply.send).toBeCalled();
    });
  });
});
