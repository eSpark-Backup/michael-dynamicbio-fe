import { api } from "./rtk";

export const pageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPage: builder.mutation({
      query: (credentials) => ({
        url: "/page",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreatePageMutation } = pageApi;
