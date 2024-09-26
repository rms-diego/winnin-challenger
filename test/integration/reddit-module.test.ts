import { describe, test, expect, beforeAll } from "vitest";
import { makeUrlGetManyPosts, makeUrlGetRangePosts } from "@test/helpers";
import supertest from "supertest";
import { app } from "@/app";

describe("Integration test reddit module ", () => {
  const request = supertest(app.server);

  beforeAll(async () => {
    app.ready();
  });

  describe("[GET] /posts/range - find posts in range tests cases", () => {
    test("it should be able to find a posts passing a range and sorted by ups", async () => {
      const startedAt = "2024-09-23 00:00:00";
      const finishedAt = "2024-09-26 00:00:00";
      const url = makeUrlGetRangePosts(startedAt, finishedAt, "ups");

      const { body } = await request.get(url).expect(200);

      const { postsQuantity, currentPage, posts } = body;

      expect(postsQuantity).toBeDefined();
      expect(postsQuantity).toBe(100);

      expect(currentPage).toBeDefined();
      expect(currentPage).toBe(1);

      expect(Array.isArray(posts)).toBe(true);

      const firstPost = posts.at(0);
      const lastPost = posts.at(posts.length - 1);

      expect(firstPost).toBeDefined();
      expect(lastPost).toBeDefined();

      expect(firstPost.ups > lastPost.ups).toBe(true);

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

    test("it should be able to find a posts passing a range and sorted by commentsQuantity", async () => {
      const startedAt = "2024-09-23 00:00:00";
      const finishedAt = "2024-09-26 00:00:00";
      const url = makeUrlGetRangePosts(
        startedAt,
        finishedAt,
        "commentsQuantity",
      );

      const { body } = await request.get(url).expect(200);

      const { postsQuantity, currentPage, posts } = body;

      expect(postsQuantity).toBeDefined();
      expect(postsQuantity).toBe(100);

      expect(currentPage).toBeDefined();
      expect(currentPage).toBe(1);

      expect(Array.isArray(posts)).toBe(true);

      const firstPost = posts.at(0);
      const lastPost = posts.at(posts.length - 1);

      expect(firstPost).toBeDefined();
      expect(lastPost).toBeDefined();

      expect(firstPost.commentsQuantity > lastPost.commentsQuantity).toBe(true);

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

    test("it should be throw when pass wrongs dates", async () => {
      const startedAt = "2080-09-23 00:00:00";
      const finishedAt = "2090-09-26 00:00:00";
      const url = makeUrlGetRangePosts(
        startedAt,
        finishedAt,
        "commentsQuantity",
      );

      const { body: error } = await request.get(url).expect(404);

      expect(error).toEqual({ error: "no post was found in the range" });
    });

    test("it should be throw when pass does not pass query params", async () => {
      const { body: error } = await request.get("/posts/range").expect(400);

      expect(error).toEqual({
        error: [
          { property: "startedAt", message: "startedAt is required" },
          { property: "finishedAt", message: "finishedAt is required" },
          {
            property: "sortBy",
            message:
              "is missing property or sortBy must be either 'commentsQuantity' or 'ups' or is missing property",
          },
        ],
      });
    });
  });

  describe("[GET] /posts - find posts", () => {
    test("it should be able to find a post sorted by ups", async () => {
      const url = makeUrlGetManyPosts("ups");

      const { body } = await request.get(url).expect(200);

      const { postsQuantity, currentPage, posts } = body;

      expect(postsQuantity).toBeDefined();
      expect(postsQuantity).toBe(100);

      expect(currentPage).toBeDefined();
      expect(currentPage).toBe(1);

      expect(Array.isArray(posts)).toBe(true);

      const firstPost = posts.at(0);
      const lastPost = posts.at(posts.length - 1);

      expect(firstPost).toBeDefined();
      expect(lastPost).toBeDefined();

      expect(firstPost.ups > lastPost.ups).toBe(true);

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

    test("it should be able to find a posts sorted by commentsQuantity", async () => {
      const url = makeUrlGetManyPosts("commentsQuantity");

      const { body } = await request.get(url).expect(200);

      const { postsQuantity, currentPage, posts } = body;

      expect(postsQuantity).toBeDefined();
      expect(postsQuantity).toBe(100);

      expect(currentPage).toBeDefined();
      expect(currentPage).toBe(1);

      expect(Array.isArray(posts)).toBe(true);

      const firstPost = posts.at(0);
      const lastPost = posts.at(posts.length - 1);

      expect(firstPost).toBeDefined();
      expect(lastPost).toBeDefined();

      expect(firstPost.commentsQuantity > lastPost.commentsQuantity).toBe(true);

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

    test("it should be throw when pass does not pass query params", async () => {
      const { body: error } = await request.get("/posts").expect(400);

      expect(true).toBe(true);
      expect(error).toEqual({
        error: [
          {
            property: "sortBy",
            message:
              "is missing property or sortBy must be either 'commentsQuantity' or 'ups' or is missing property",
          },
        ],
      });
    });
  });
});
