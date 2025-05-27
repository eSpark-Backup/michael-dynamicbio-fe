import { createSlice } from "@reduxjs/toolkit";
import { notificationsApi } from "../../services/notification";

const initialState = {
  notifications: [],
  totalItems: 0,
};

const slice = createSlice({
  name: "notifications",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationsApi.endpoints.getAllNotifications.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.notifications = [...state.notifications, ...data?.notifications];
        state.totalItems = data?.pagination?.totalItems;
      }
    );
  },
});

export default slice.reducer;
