export interface CommentUser {
  uname: string;
  profilePicUrl: string;
  supabaseId: string;
  userId: string;
}

export interface Comment {
  id: number;
  comment: string;
  likes: number;
  createdAt: Date;
  user: CommentUser;
}
