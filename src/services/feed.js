import { api } from "./rtk";

export const feedApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedPosts: builder.query({
            query: ({ page = 1, limit = 15 }) => ({
                url: "/user/timeline",
                method: "GET",
                params: {
                    page,
                    pageSize: limit
                }
            })
        })
    })
})

export const { useGetFeedPostsQuery } = feedApi