import { createSlice } from '@reduxjs/toolkit';
import { notificationsApi } from '../../services/notification';

const initialState = {
  notifications: [],
  totalPage: 0,
  currentPage: 1,
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationsApi.endpoints.getAllNotifications.matchFulfilled,
      (state, { payload, meta }) => {
        const { data } = payload;
        const requestedPage = meta.arg.originalArgs?.page || 1;

        if (requestedPage > state.currentPage) {
          state.notifications = [...state.notifications, ...data.notifications];
          state.currentPage = requestedPage;
        } else if (requestedPage === 1) {
          state.notifications = data?.notifications;
          state.currentPage = 1;
        }

        state.totalPage = data?.pagination?.totalPages;
      }
    );
  },
});

export default slice.reducer;
