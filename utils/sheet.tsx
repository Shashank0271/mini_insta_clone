import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';
import CommentSheet from '../screens/HomeScreen/components/CommentSheet';
import ImagePickerSheet from '../screens/AddPostScreen/components/ImagePickerSheet';

registerSheet('comment-sheet', CommentSheet);
registerSheet('image-picker-sheet', ImagePickerSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'comment-sheet': SheetDefinition<{
      payload: {
        postId: number;
      };
    }>;
  }
}

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'image-picker-sheet': SheetDefinition<{
      payload: {
        handleCamera: (...args: any) => void;
        handleGallery: (...args: any) => void;
      };
    }>;
  }
}
