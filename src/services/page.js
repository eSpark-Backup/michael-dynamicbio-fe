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
        url: "/page/user/my?page=1&pageSize=100",
        method: "GET",
      }),
    }),
    getAllPages: builder.query({
      query: () => ({
        url: `/page?page=1&pageSize=100`,
        method: "GET",
      }),
    }),
    getFollowedPages: builder.query({
      query: () => ({
        url: `/page/user/followed?page=1&pageSize=100`,
        method: "GET",
      }),
    }),
    followPage: builder.mutation({
      query: (id) => ({
        url: `/page/${id}/follow`,
        method: "POST",
      }),
    }),
    deletePage: builder.mutation({
      query: (id) => ({
        url: `/page/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePageMutation,
  useGetMyPagesQuery,
  useGetAllPagesQuery,
  useGetFollowedPagesQuery,
  useFollowPageMutation,
  useDeletePageMutation,
} = pageApi;
