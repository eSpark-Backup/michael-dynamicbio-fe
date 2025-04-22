import { api } from "./rtk";

export const bondApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allBonds: builder.query({
      query: ({ page, pageSize, search }) => ({
        url: `/bond?page=${page}&pageSize=${pageSize}${
          search ? `&search=${search}` : ""
        }`,
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
      query: ({ type, search }) => ({
        url: `/bond/requests?type=${type}&page=1&pageSize=100${
          search ? `&search=${search}` : ""
        }`,
        method: "GET",
        keepUnusedDataFor: 0,
        refetchOnMountOrArgChange: true,
      }),
    }),
    updateBondReq: builder.mutation({
      query: (credentials) => ({
        url: "/bond/update-status",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    getMyBonds: builder.query({
      query: ({ page, pageSize, search }) => ({
        url: `/bond/user-bonds?page=${page}&pageSize=${pageSize}&search=${search}`,
        method: "GEt",
        keepUnusedDataFor: 0,
        refetchOnMountOrArgChange: true,
      }),
    }),
  }),
});

export const {
  useAllBondsQuery,
  useSendBondReqMutation,
  useAllBondsReqQuery,
  useUpdateBondReqMutation,
  useGetMyBondsQuery,
} = bondApi;
