export interface User {
  _id: number;
  name: string;
  avatar: string;
}

export interface FeedDataItem {
  _id: number;
  createdAt: string;
  image: string;
  text: string;
  likeCount: number;
  commentCount: number;
  user: User;
}
