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
    try {
      console.log("\nstart data fetching from reddit");
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
      console.log("finish data fetching from reddit\n");
    } catch (e) {
      console.log(e);
    }
  };

  public findPostsInRange = async (
    params: FindPostsInRangeDTO,
  ): Promise<PostsFoundDTO> => {
    const skippedPosts = (params.pageNumber - 1) * params.postsQuantity;

    const posts = await this.redditRepository.findPostsInRange({
      ...params,
      skippedPosts,
    });

    if (!posts.length) {
      throw new Exception("no post was found in the range", 404);
    }

    return {
      postsQuantity: posts.length,
      currentPage: params.pageNumber,
      posts,
    };
  };

  public findManyPosts = async (
    params: FindManyPostsDTO,
  ): Promise<PostsFoundDTO> => {
    const skippedPosts = (params.pageNumber - 1) * params.postsQuantity;

    const posts = await this.redditRepository.findManyPosts({
      ...params,
      skippedPosts,
    });

    if (!posts.length) {
      throw new Exception("no posts found", 404);
    }

    return {
      postsQuantity: posts.length,
      currentPage: params.pageNumber,
      posts,
    };
  };
}
