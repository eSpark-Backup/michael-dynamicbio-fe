import { api } from './rtk';

export const interactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    like: builder.mutation({
      query: (data) => ({
        url: '/interaction/like',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getPostComments: builder.query({
      query: (postId) => ({
        url: `/interaction/comments/${postId}`,
        method: 'GET',
      }),
    }),
    comment: builder.mutation({
      query: (data) => ({
        url: '/interaction/comments',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useLikeMutation, useGetPostCommentsQuery, useCommentMutation } =
  interactionApi;
