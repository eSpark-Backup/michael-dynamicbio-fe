import { api } from "./rtk";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    generateQr: builder.mutation({
      query: () => ({
        url: "/user/generate-qr",
        method: "GET",
        credentials: "include",
      }),
    }),
    verifyQr: builder.mutation({
      query: (credentials) => ({
        url: "/user/verify-qr",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    resyncMfa: builder.mutation({
      query: (credentials) => ({
        url: "/user/resync-qr",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    verifymfaWithEmail: builder.mutation({
      query: () => ({
        url: "/user/verify-new-device",
        method: "GET",
        credentials: "include",
      }),
    }),
    reverifymfaWithEmail: builder.mutation({
      query: ({ token, expiresAt }) => ({
        url: `/auth/register-device/${token}/${expiresAt}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token, expiresAt }) => ({
        url: `/auth/set-password/${token}/${expiresAt}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    completeProfile: builder.mutation({
      query: (credentials) => ({
        url: `/user/add-profile`,
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ credentials, token, expiresAt }) => ({
        url: `/auth/reset-password/${token}/${expiresAt}`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/user/profile",
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
    changePw: builder.mutation({
      query: (credentials) => ({
        url: "/user/change-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    changeProfileImage: builder.mutation({
      query: (credentials) => ({
        url: "/user/profileImage",
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
    getUserFavourities: builder.query({
      query: ({ page, pageSize, entity } = {}) => {
        const baseUrl = "/user/favourites";
        const queryParams = new URLSearchParams();

        if (pageSize) queryParams.append("pageSize", pageSize);
        if (page) queryParams.append("page", page);
        if (entity) queryParams.append("entity", entity);

        const queryString = queryParams.toString()
          ? `?${queryParams.toString()}`
          : "";

        return {
          url: `${baseUrl}${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGenerateQrMutation,
  useVerifyQrMutation,
  useResyncMfaMutation,
  useVerifymfaWithEmailMutation,
  useReverifymfaWithEmailMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useCompleteProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePwMutation,
  useChangeProfileImageMutation,
  useGetUserFavouritiesQuery,
} = authApi;
