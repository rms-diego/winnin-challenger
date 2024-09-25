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
