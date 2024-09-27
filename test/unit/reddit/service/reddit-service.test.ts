import { describe, test, expect, vi } from "vitest";

import {
  mockFindManyPosts,
  mockFindPostsInRange,
  mockPostsFound,
  responseFromRedditMock,
} from "@test/mocks";
import { RedditService } from "@/modules/reddit/service";
import { RedditRepository } from "@/modules/reddit/repository";

describe("Unit tests reddit service", () => {
  const redditRepositoryMock = {
    createMany: vi.fn().mockImplementation(() => {}),
    findPostsInRange: vi.fn().mockImplementation(() => mockPostsFound),
    findManyPosts: vi.fn().mockImplementation(() => mockPostsFound), // Mock para findManyPosts
  } as unknown as RedditRepository;

  const redditService = new RedditService(redditRepositoryMock);
  global.fetch = vi
    .fn()
    .mockImplementation(() => ({ json: async () => responseFromRedditMock }));

  describe("createMany method tests cases", () => {
    test("It should be able to call create many", async () => {
      await redditService.fetchPostsFromReddit();

      expect(redditRepositoryMock.createMany).toBeCalled();
      expect(redditRepositoryMock.createMany).toBeCalledWith([
        {
          authorFullName: "foo",
          commentsQuantity: 20,
          createdAt: "2024-09-26T17:40:59.000Z",
          title: "lorem ipsum",
          ups: 20,
        },
      ]);
    });
  });

  describe("findPostsInRange method tests cases", () => {
    test("It should be able to call findPostsInRange", async () => {
      const data = await redditService.findPostsInRange(mockFindPostsInRange);

      const { postsQuantity, currentPage, posts } = data;

      expect(postsQuantity).toBeDefined();
      expect(postsQuantity).toBe(2);

      expect(currentPage).toBeDefined();
      expect(currentPage).toBe(1);

      expect(Array.isArray(posts)).toBe(true);

      const firstPost = posts[0];

      expect(firstPost).toBeDefined();

      expect(firstPost.id).toBeDefined();
      expect(typeof firstPost.id).toBe("string");

      expect(firstPost.authorFullName).toBeDefined();
      expect(typeof firstPost.authorFullName).toBe("string");

      expect(firstPost.title).toBeDefined();
      expect(typeof firstPost.title).toBe("string");

      expect(firstPost.ups).toBeDefined();
      expect(typeof firstPost.ups).toBe("number");

      expect(firstPost.commentsQuantity).toBeDefined();
      expect(typeof firstPost.commentsQuantity).toBe("number");
    });

    test("It should throw when post was not found", async () => {
      redditRepositoryMock.findPostsInRange = vi
        .fn()
        .mockImplementation(() => []);

      await expect(
        redditService.findPostsInRange(mockFindPostsInRange),
      ).rejects.toThrowError();
    });
  });

  describe("findManyPosts method tests cases", () => {
    test("It should be able to call findManyPosts", async () => {
      const data = await redditService.findManyPosts(mockFindManyPosts);

      const { postsQuantity, currentPage, posts } = data;

      expect(postsQuantity).toBeDefined();
      expect(postsQuantity).toBe(2);

      expect(currentPage).toBeDefined();
      expect(currentPage).toBe(1);

      expect(Array.isArray(posts)).toBe(true);

      const firstPost = posts[0];

      expect(firstPost).toBeDefined();

      expect(firstPost.id).toBeDefined();
      expect(typeof firstPost.id).toBe("string");

      expect(firstPost.authorFullName).toBeDefined();
      expect(typeof firstPost.authorFullName).toBe("string");

      expect(firstPost.title).toBeDefined();
      expect(typeof firstPost.title).toBe("string");

      expect(firstPost.ups).toBeDefined();
      expect(typeof firstPost.ups).toBe("number");

      expect(firstPost.commentsQuantity).toBeDefined();
      expect(typeof firstPost.commentsQuantity).toBe("number");
    });

    test("It should throw when posts were not found", async () => {
      redditRepositoryMock.findManyPosts = vi.fn().mockImplementation(() => []);

      await expect(
        redditService.findManyPosts(mockFindManyPosts),
      ).rejects.toThrowError();
    });
  });
});
