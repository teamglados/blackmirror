export interface StartData {
  firstName: string;
  lastName: string;
  selectedCategories: { [category: string]: string[] };
  picBase64: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface PostContent {
  text: string;
  image: string;
  timestampMsCreated: number;
  likeCount: number;
}

export interface Post {
  id: string;
  post: {
    user: User;
    content: PostContent;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: User;
  content: PostContent;
}

export interface Message {
  id: string;
  user: User;
  content: PostContent;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
}

export interface UserDetails {
  cover: string; // Cover image
  bio: string;
  currentJob: string;
  currentStudy: string;
  currentHometown: string;
  friendCount: number;
  friendPicks: Friend[];
}

export interface ProfileData {
  user: User;
  details: UserDetails;
  posts: Post[];
}

export interface AppState {
  user: User;
  posts: Post[];
  messages: Message[];
}
