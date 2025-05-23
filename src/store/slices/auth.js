import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
import { eventBus } from "../../utils";
import { CHAT_LEFT } from "../../socket/events";
import { createSocket, disconnectSocket } from "../../socket";

const initialState = {
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("onlineUsers");
      eventBus.emit(CHAT_LEFT);
      disconnectSocket();
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data?.user;
        localStorage.setItem("user", JSON.stringify(data?.user));
      }
    );
    builder.addMatcher(
      authApi.endpoints.getUserInfo.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data;
        localStorage.setItem("user", JSON.stringify(data));
        createSocket();
      }
    );
    builder.addMatcher(
      authApi.endpoints.verifyEmail.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data.user;
        localStorage.setItem("token", data?.token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.completeProfile.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data;
        localStorage.setItem("user", JSON.stringify(data));
      }
    );
    builder.addMatcher(
      authApi.endpoints.updateUserProfileSettings.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data;
        localStorage.setItem("user", JSON.stringify(data));
      }
    );
  },
});

export const { logout, updateUser } = slice.actions;

export default slice.reducer;
