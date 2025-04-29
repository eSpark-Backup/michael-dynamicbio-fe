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
    getMyPages: builder.query({
      query: () => ({
        url: "/page/user/my",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePageMutation, useGetMyPagesQuery } = pageApi;
