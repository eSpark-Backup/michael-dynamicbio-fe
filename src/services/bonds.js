import { api } from "./rtk";

export const bondApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allBonds: builder.query({
      query: () => ({
        url: "/bond",
        method: "GET",
      }),
    }),
    sendBondReq: builder.mutation({
      query: (credentials) => ({
        url: "/bond",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    allBondsReq: builder.query({
      query: (type) => ({
        url: `/bond/requests?type=${type}&page=1&pageSize=100`,
        method: "GET",
        keepUnusedDataFor: 0,
        refetchOnMountOrArgChange: true,
      }),
    }),
  }),
});

export const { useAllBondsQuery, useSendBondReqMutation, useAllBondsReqQuery } =
  bondApi;
