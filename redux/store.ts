import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/appUser';
import followReducer from './reducers/follow';

const rootReducer = combineReducers({
  user: userReducer,
  follow: followReducer,
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
