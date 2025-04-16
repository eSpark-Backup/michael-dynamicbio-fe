import { api } from "./rtk"

export const interactionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        like: builder.mutation({
            query: (data) => ({
                url: "/interaction/like",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    })
})

export const { useLikeMutation } = interactionApi