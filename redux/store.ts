import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/appUser';
import followReducer from './reducers/follow';
import postReducer from './reducers/posts';
import commentReducer from './reducers/comment';

const rootReducer = combineReducers({
  user: userReducer,
  follow: followReducer,
  post: postReducer,
  comment: commentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
