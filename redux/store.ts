import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user';

const rootReducer = combineReducers({user: userReducer});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
