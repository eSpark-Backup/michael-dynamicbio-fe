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
      query: ({ page = 1, limit = 15 }) => ({
        url: "/post",
        method: "GET",
        params: {
          page,
          pageSize: limit
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

        formData.append("content", JSON.stringify(credentials.content));
        formData.append("status", credentials.status);
        formData.append("visibility", credentials.visibility);
        formData.append("type", credentials.type);

        if (typeof credentials.cover !== "string" && credentials.cover) {
          formData.append("cover", credentials.cover);
        }

        return {
          url: `/post/${credentials?.id}`,
          method: "PUT",
          body: formData,
          credentials: "include",
        };
      },
    }),
    interactPoll: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/poll/${id}/vote`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useNewPostMutation,
  useGetMyPostQuery,
  useGetPostByIdQuery,
  useEditPostMutation,
  useInteractPollMutation,
} = postApi;
