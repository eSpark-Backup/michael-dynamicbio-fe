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
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/group/${id}`,
        method: "DELETE",
      }),
    }),
    followGroup: builder.mutation({
      query: (id) => ({
        url: `/group/follow/${id}`,
        method: "POST",
      }),
    }),
    getGroupDetail: builder.query({
      query: (id) => ({
        url: `/group/${id}`,
        method: "GET",
      }),
    }),
    editGroup: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/group/${id}`,
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
    getGroupPendingPost: builder.query({
      query: (id) => ({
        url: `/group/${id}/posts/pending`,
        method: "GET",
      }),
    }),
    updateGroupPendingPost: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/group/posts/${id}/action`,
        method: "PATCH",
        body: credentials,
        credentials: "include",
      }),
    }),
    makeGroupAdmin: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/group/${id}/admin`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    deleteGroupAdmin: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/group/${id}/admin`,
        method: "DELETE",
        body: credentials,
        credentials: "include",
      }),
    }),
    getGroupJoinReq: builder.query({
      query: (id) => ({
        url: `/group/request/pending/${id}`,
        method: "GET",
      }),
    }),
    updateGroupJoinReq: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/group/request/approve/${id}`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetMyGroupsQuery,
  useGetAllGroupsQuery,
  useGetFollowedGroupsQuery,
  useDeleteGroupMutation,
  useFollowGroupMutation,
  useGetGroupDetailQuery,
  useEditGroupMutation,
  useGetGroupPendingPostQuery,
  useUpdateGroupPendingPostMutation,
  useMakeGroupAdminMutation,
  useDeleteGroupAdminMutation,
  useGetGroupJoinReqQuery,
  useUpdateGroupJoinReqMutation,
} = groupApi;
