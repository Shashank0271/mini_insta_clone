import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';
import CommentSheet from '../components/CommentSheet';

registerSheet('comment-sheet', CommentSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'comment-sheet': SheetDefinition<{
      payload: {
        postId: number;
      };
    }>;
  }
}
