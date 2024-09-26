import { randomUUID } from "crypto";

// reddit repository
export const mockPostsFound = [
  {
    id: randomUUID(),
    title: "Post 1",
    commentsQuantity: 20,
    ups: 20,
    createdAt: new Date().toISOString(),
    authorFullName: randomUUID(),
  },
  {
    id: randomUUID(),
    title: "Post 2",
    commentsQuantity: 19,
    ups: 19,
    createdAt: new Date().toISOString(),
    authorFullName: randomUUID(),
  },
];

export const mockDataCreateManyRepository = [
  {
    title: "Post 1",
    commentsQuantity: 20,
    ups: 20,
    createdAt: new Date().toISOString(),
    authorFullName: randomUUID(),
  },
  {
    title: "Post 2",
    commentsQuantity: 20,
    ups: 20,
    createdAt: new Date().toISOString(),
    authorFullName: randomUUID(),
  },
];

// repository mock DTO
export const mockFindPostsInRange: {
  pageNumber: number;
  postsQuantity: number;
  skippedPosts: number;
  finishedAt: Date;
  startedAt: Date;
  sortBy: "ups" | "commentsQuantity";
} = {
  pageNumber: 1,
  postsQuantity: 100,
  skippedPosts: 0,
  finishedAt: new Date("2024-09-26 00:00:00"),
  startedAt: new Date("2024-09-26 00:00:00"),
  sortBy: "commentsQuantity",
};

export const mockFindManyPosts: {
  pageNumber: number;
  postsQuantity: number;
  skippedPosts: number;
  sortBy: "ups" | "commentsQuantity";
} = {
  pageNumber: 1,
  postsQuantity: 100,
  skippedPosts: 0,
  sortBy: "commentsQuantity",
};
