import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import search from "./slices/search";
import { authApi } from "../services/auth";

const store = configureStore({
  reducer: {
    auth,
    search,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
