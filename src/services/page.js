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
    getPageById: builder.query({
      query: (id) => ({
        url: `/page/${id}`,
        method: "GET",
      }),
    }),
    getPostsByPage: builder.query({
      query: ({ pageId, page, pageSize }) => ({
        url: `/post/page/${pageId}?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    editPage: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/page/${id}`,
        method: "PUT",
        body: credentials,
        credentials: "include",
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
  useGetPageByIdQuery,
  useGetPostsByPageQuery,
  useEditPageMutation,
} = pageApi;
