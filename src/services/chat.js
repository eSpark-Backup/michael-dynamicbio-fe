import { api } from "./rtk";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyChat: builder.query({
      query: () => ({
        url: `/chat/my`,
        method: "GET",
      }),
    }),
    getAllChat: builder.query({
      query: ({ id, page, pageSize }) => ({
        url: `/chat/message/${id}?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyChatQuery, useGetAllChatQuery } = chatApi;
