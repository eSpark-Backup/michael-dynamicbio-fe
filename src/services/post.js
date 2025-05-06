import { api } from "./rtk";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    newPost: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();

        formData.append("content", JSON.stringify(credentials.content));
        formData.append("status", credentials.status);
        formData.append("visibility", credentials.visibility);
        formData.append("type", credentials.type);
        if (credentials?.poll)
          formData.append("poll", JSON.stringify(credentials.poll));

        if (credentials.cover) formData.append("cover", credentials.cover);
        if (
          credentials?.images &&
          Object.keys(credentials?.images).length > 0
        ) {
          const imageOrder = [];

          credentials.images.forEach((file) => {
            formData.append("images", file);
            imageOrder.push(file.name);
          });

          formData.append("imageOrder", JSON.stringify(imageOrder));
        }
        if (
          credentials?.videos &&
          Object.keys(credentials?.videos).length > 0
        ) {
          credentials.videos.forEach((file) => {
            formData.append("videos", file);
          });
        }
        if (
          credentials?.thumbnails &&
          Object.keys(credentials?.thumbnails).length > 0
        ) {
          credentials.thumbnails.forEach((file) => {
            formData.append("thumbnails", file);
          });
        }
        return {
          url: "/post",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
    }),
    getMyPost: builder.query({
      query: ({ page = 1, limit = 15, id }) => ({
        url: id ? `/user/public-profile/post?profileId=${id}` : "/post",
        method: "GET",
        params: {
          page,
          pageSize: limit,
          status: "PUBLISH",
        }
      }),
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
    }),
    editPost: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        if (credentials?.edit) {
          formData.append("edit", credentials.edit);
        }

        if (credentials?.content) {
          formData.append("content", JSON.stringify(credentials.content));
        }
        formData.append("status", credentials.status);
        if (credentials?.visibility) {
          formData.append("visibility", credentials.visibility);
        }
        if (credentials?.commentVisibility) {
          formData.append("commentVisibility", credentials.commentVisibility);
        }
        if (credentials?.type) {
          formData.append("type", credentials.type);
        }
        if (!credentials?.edit && typeof credentials.cover !== "string" && credentials.cover) {
          formData.append("cover", credentials.cover);
        }


        return {
          url: `/post/${credentials?.id}`,
          method: "PUT",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ['post'],
    }),
    interactPoll: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/poll/${id}/vote`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    removePoll: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/poll/${id}/vote`,
        method: "DELETE",
        body: credentials,
        credentials: "include",
      }),
    }),
    savePost: builder.mutation({
      query: ({ postId, type }) => ({
        url: `/user/save/${postId}`,
        method: "POST",
        credentials: "include",
        body: { type }
      })
    }),
    getSavedPosts: builder.query({
      query: ({ page = 1, limit = 15 }) => ({
        url: "/user/saved-posts",
        method: "GET",
        params: {
          page,
          pageSize: limit
        }
      })
    }),
    deletePostById: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ['post'],
    }),
  }),
});

export const {
  useNewPostMutation,
  useGetMyPostQuery,
  useGetPostByIdQuery,
  useEditPostMutation,
  useInteractPollMutation,
  useRemovePollMutation,
  useSavePostMutation,
  useGetSavedPostsQuery,
  useDeletePostByIdMutation
} = postApi;
