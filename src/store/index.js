import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import search from './slices/search';
import chat from './slices/chat';
import notifications from './slices/notifications';
import { authApi } from '../services/auth';
import { notificationsApi } from '../services/notification';

const store = configureStore({
  reducer: {
    auth,
    search,
    chat,
    notifications,
    [authApi.reducerPath]: authApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
