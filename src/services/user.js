import { api } from './rtk';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    publicProfile: builder.mutation({
      query: ({ id, bond }) => {
        let queryParams = `userId=${id}`;
        if (bond) {
          queryParams += `&bond=${bond}`;
        }
        return {
          url: `/user/public-profile?${queryParams}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { usePublicProfileMutation } = userApi;
