import { api } from "./rtk";

export const bondApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allBonds: builder.query({
      query: () => ({
        url: "/bond",
        method: "GET",
      }),
    }),
  }),
});

export const { useAllBondsQuery } = bondApi;
