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
      message: "sortBy must be either 'commentsQuantity' or 'ups'",
    }),
  }),
});

export type FindPostsInRangeDTO = Zod.infer<typeof findPostsInRangeSchema>;

// find many
export const findManyPostsSchema = zod.object({
  sortBy: zod.enum(["commentsQuantity", "ups"], {
    errorMap: () => ({
      message: "sortBy must be either 'commentsQuantity' or 'ups'",
    }),
  }),
});

export type FindManyPostsDTO = Zod.infer<typeof findManyPostsSchema>;
