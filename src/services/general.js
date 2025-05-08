import { api } from "./rtk"

export const generalPageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGeneralPage: builder.query({
            query: (data) => ({
                url: `/user/share/${data}`,
                method: "GET",
            }),
        }),
    })
})

export const { useGetGeneralPageQuery } = generalPageApi