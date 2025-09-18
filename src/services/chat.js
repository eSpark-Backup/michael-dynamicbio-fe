import { api } from './rtk';

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyChat: builder.query({
      query: () => ({
        url: `/chat/my`,
        method: 'GET',
      }),
    }),
    getAllChat: builder.query({
      query: ({ id, page, pageSize }) => {
        return id
          ? {
              url: `/chat/message/${id}?page=${page}&pageSize=${pageSize}`,
              method: 'GET',
            }
          : {};
      },
    }),
    createGroupChat: builder.mutation({
      query: (credentials) => ({
        url: `/chat/group/create`,
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    removeMember: builder.mutation({
      query: (credentials) => ({
        url: `/chat/group/member/remove`,
        method: 'DELETE',
        body: credentials,
        credentials: 'include',
      }),
    }),
    addMember: builder.mutation({
      query: (credentials) => ({
        url: `/chat/group/member/add`,
        method: 'PUT',
        body: credentials,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetMyChatQuery,
  useGetAllChatQuery,
  useCreateGroupChatMutation,
  useRemoveMemberMutation,
  useAddMemberMutation,
} = chatApi;
