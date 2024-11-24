export interface Post {
  id: number;
  imageUrls: string[];
  caption: string;
  likes: number;
  comments: number;
  createdAt: Date;
  user: {
    uname: string;
    profilePicUrl: string;
    supabaseId: string;
    userId: string;
  };
}
