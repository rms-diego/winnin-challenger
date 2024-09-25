import { logger } from "@/app";
import {
  FindPostsInRangeDTO,
  redditChildrenSchema,
  ResponseReddit,
} from "../@types";
import { RedditRepository } from "../repository";
import { Exception } from "@/utils/exception";

export class RedditService {
  constructor(private readonly redditRepository: RedditRepository) {}

  public fetchPostsFromReddit = async () => {
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

  public findPostsInRange = async (params: FindPostsInRangeDTO) => {
    const posts = await this.redditRepository.findPostsInRange(params);

    if (!posts.length) {
      throw new Exception("no post was found in the range ", 404);
    }

    return posts;
  };
}
