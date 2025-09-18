import { api } from "./rtk";

export const generalPageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralPage: builder.query({
      query: (data) => ({
        url: `/user/share/${data}`,
        method: "GET",
      }),
    }),
    getUniversalSearch: builder.query({
      query: ({ page, pageSize, keyword, type }) => ({
        url: `/user/search?page=${page}&pageSize=${pageSize}&keyword=${keyword}&type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGeneralPageQuery, useGetUniversalSearchQuery } =
  generalPageApi;
