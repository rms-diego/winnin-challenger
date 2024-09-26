export function makeUrlGetRangePosts(
  startedAt: string,
  finishedAt: string,
  sortBy: "ups" | "commentsQuantity",
) {
  return `/posts/range?startedAt=${startedAt}&finishedAt=${finishedAt}&sortBy=${sortBy}`;
}

export function makeUrlGetManyPosts(sortBy: "ups" | "commentsQuantity") {
  return `/posts?sortBy=${sortBy}`;
}
