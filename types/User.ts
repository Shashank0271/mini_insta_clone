export interface AppUser {
  userId: string;
  supabaseId: string;
  name: string;
  uname: string;
  accountType: AccountType;
  email: string;
  bio: string;
  profilePicUrl: string;
  followers: number;
  following: number;
  posts: number;
}

export enum AccountType {
  PUBLIC,
  PRIVATE,
}
