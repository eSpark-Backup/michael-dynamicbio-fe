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
  }),
});

export const { useAllBondsQuery, useSendBondReqMutation } = bondApi;
