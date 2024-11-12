export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  createdAt: Date;
}

export interface FeedPosts {
  feed: Array<Post>;
}
