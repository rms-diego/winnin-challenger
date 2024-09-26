import { logger } from "@/app";
import { RedditRepository } from "../repository";
import { Exception } from "@/utils/exception";
import {
  FindManyPostsDTO,
  FindPostsInRangeDTO,
  PostsFoundDTO,
  redditChildrenSchema,
  ResponseReddit,
} from "../@types";

export class RedditService {
  constructor(private readonly redditRepository: RedditRepository) {}

  public fetchPostsFromReddit = async (): Promise<void> => {
    logger.info("start fetch data from reddit");
    const res = await fetch("https://api.reddit.com/r/artificial/hot");

    const {
      data: { children: redditData },
    }: ResponseReddit = await res.json();

    const serializedRedditPosts = redditData.map((data) => {
      const { data: dataSerialized } = redditChildrenSchema.parse(data);
      const createdAtToMs = dataSerialized.created_utc * 1000;

      return {
        ups: dataSerialized.ups,
        authorFullName: dataSerialized.author_fullname,
        createdAt: new Date(createdAtToMs).toISOString(),
        commentsQuantity: dataSerialized.num_comments,
        title: dataSerialized.title,
      };
    });

    await this.redditRepository.createMany(serializedRedditPosts);
    logger.info("finish fetch data from reddit\n");
  };

  public findPostsInRange = async (
    params: FindPostsInRangeDTO,
  ): Promise<PostsFoundDTO> => {
    const posts = await this.redditRepository.findPostsInRange(params);

    if (!posts.length) {
      throw new Exception("no post was found in the range", 404);
    }

    return { postsQuantity: params.postsQuantity, posts };
  };

  public findManyPosts = async (
    params: FindManyPostsDTO,
  ): Promise<PostsFoundDTO> => {
    const posts = await this.redditRepository.findManyPosts(params);

    if (!posts.length) {
      throw new Exception("no posts found", 404);
    }

    return { postsQuantity: params.postsQuantity, posts };
  };
}
