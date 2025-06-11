import { api } from "./rtk";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    chatBotHistory: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/user/chat-history`,
        method: "GET",
        params: {
          page,
          pageSize,
        },
      }),
    }),
    chatBotMessageById: builder.query({
      query: ({ page, pageSize, chatId }) => ({
        url: `/user/chat-messages`,
        method: "GET",
        params: {
          page,
          pageSize,
          chatId,
        },
      }),
    }),
  }),
});

export const { useChatBotHistoryQuery, useChatBotMessageByIdQuery } = chatApi;
