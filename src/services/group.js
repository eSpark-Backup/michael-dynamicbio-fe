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
  }),
});

export const { useCreateGroupMutation, useGetMyGroupsQuery } = groupApi;
