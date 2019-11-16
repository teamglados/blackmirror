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
}
