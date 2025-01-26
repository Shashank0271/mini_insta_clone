import {Post} from './Post';
import {User} from './User';

export interface ViewProfile {
  userProfileData: User;
  relationType: RelationType;
  postList: Post[];
}

export enum RelationType {
  REQUESTED = 'REQUESTED',
  FOLLOWING = 'FOLLOWING',
  PUBLIC_ACCOUNT = 'PUBLIC_ACCOUNT',
  NONE = 'NONE',
}
