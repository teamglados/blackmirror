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
  user: User;
  comments: Comment[];
}

export type Comment = Omit<FeedDataItem, 'comments' | 'image'>;

export interface ProfileData {
  _id: number;
  name: string;
  avatar: string; // Profile image
  cover: string; // Cover image
  bio: string;
  currentJob: string;
  currentStudy: string;
  currentHometown: string;
  friendCount: number;
  friendPicks: User[];
  feed: FeedDataItem[];
}
