import { posts as Posts } from "@prisma/client";
import { z as zod } from "zod";

// Reddit request types
export const redditChildrenSchema = zod.object({
  kind: zod.string(),
  data: zod.object({
    author_fullname: zod.string(),
    title: zod.string(),
    created_utc: zod.number(),
    ups: zod.number(),
    num_comments: zod.number(),
  }),
});

type RedditChildrenType = Zod.infer<typeof redditChildrenSchema>;

export type ResponseReddit = {
  data: {
    children: RedditChildrenType[];
  };
};

// create many
export type CreateManyDTO = {
  ups: number;
  authorFullName: string;
  createdAt: string;
  commentsQuantity: number;
  title: string;
}[];

// find posts in range
export const findPostsInRangeSchema = zod.object({
  startedAt: zod
    .string({ required_error: "startedAt is required" })
    .transform((startedAt) => new Date(startedAt))
    .refine((startedAt) => startedAt.toString() !== "Invalid Date", {
      message: "invalid date",
    }),

  finishedAt: zod
    .string({ required_error: "finishedAt is required" })
    .transform((finishedAt) => new Date(finishedAt))
    .refine((finishedAt) => finishedAt.toString() !== "Invalid Date", {
      message: "invalid date",
    }),

  sortBy: zod.enum(["commentsQuantity", "ups"], {
    errorMap: () => ({
      message:
        "is missing property or sortBy must be either 'commentsQuantity' or 'ups' or is missing property",
    }),
  }),

  postsQuantity: zod
    .number({ message: "must be a number" })
    .min(1, "must  be greater than or equal 1")
    .default(100),

  pageNumber: zod
    .number({ message: "must be a number" })
    .min(1, "must be greater than or equal 1")
    .default(1),
});

export type FindPostsInRangeDTO = Zod.infer<typeof findPostsInRangeSchema>;
export type FindPostsInRangeRepositoryDTO = Zod.infer<
  typeof findPostsInRangeSchema
> & {
  skippedPosts: number;
};

// find many
export const findManyPostsSchema = zod.object({
  sortBy: zod.enum(["commentsQuantity", "ups"], {
    errorMap: () => ({
      message:
        "is missing property or sortBy must be either 'commentsQuantity' or 'ups' or is missing property",
    }),
  }),

  postsQuantity: zod
    .number({ message: "must be a number" })
    .min(1, "must be greater than or equal 1")
    .default(100),

  pageNumber: zod
    .number({ message: "must be a number" })
    .min(1, "must be greater than or equal 1")
    .default(1),
});

export type FindManyPostsDTO = Zod.infer<typeof findManyPostsSchema>;
export type FindManyPostsRepositoryDTO = Zod.infer<
  typeof findManyPostsSchema
> & {
  skippedPosts: number;
};

export type PostsFoundDTO = {
  postsQuantity: number;
  currentPage: number;
  posts: Posts[];
};
