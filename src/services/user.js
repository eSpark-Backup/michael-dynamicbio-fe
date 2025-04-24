import { api } from "./rtk";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    publicProfile: builder.mutation({
      query: (id) => ({
        url: `/user/public-profile?userId=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { usePublicProfileMutation } = userApi;
