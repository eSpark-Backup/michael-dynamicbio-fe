import { api } from './rtk';

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    chatBotHistory: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/user/chat-history`,
        method: 'GET',
        params: {
          page,
          pageSize,
        },
      }),
    }),
    chatBotMessageById: builder.query({
      query: ({ page, pageSize, chatId }) => ({
        url: `/user/chat-messages`,
        method: 'GET',
        params: {
          page,
          pageSize,
          chatId,
        },
      }),
    }),
    deleteChat: builder.mutation({
      query: ({ chatId }) => ({
        url: `/user/chat-history/${chatId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useChatBotHistoryQuery,
  useChatBotMessageByIdQuery,
  useDeleteChatMutation,
} = chatApi;
