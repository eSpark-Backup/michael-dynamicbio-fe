import { api } from "./rtk";

export const groupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (credentials) => ({
        url: "/group",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    getMyGroups: builder.query({
      query: () => ({
        url: "/group/user/my?page=1&pageSize=100",
        method: "GET",
      }),
    }),
    getAllGroups: builder.query({
      query: () => ({
        url: `/group?page=1&pageSize=100`,
        method: "GET",
      }),
    }),
    getFollowedGroups: builder.query({
      query: () => ({
        url: `/group/user/followed?page=1&pageSize=100`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetMyGroupsQuery,
  useGetAllGroupsQuery,
  useGetFollowedGroupsQuery,
} = groupApi;
