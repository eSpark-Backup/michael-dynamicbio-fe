import { api } from './rtk';

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/user/notifications?page=${page}&pageSize=${pageSize}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllNotificationsQuery } = notificationsApi;
