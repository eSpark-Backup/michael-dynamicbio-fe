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
    getUserInfo: builder.mutation({
      query: () => ({
        url: "/user/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (credentials) => ({
        url: "/user/profile",
        method: "PUT",
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
    findEmail: builder.mutation({
      query: (credentials) => ({
        url: "/auth/find-email",
        method: "POST",
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
    updateUserProfileSettings: builder.mutation({
      query: (credentials) => ({
        url: "/user/profile/settings",
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoMutation,
  useUpdateUserInfoMutation,
  useGenerateQrMutation,
  useVerifyQrMutation,
  useResyncMfaMutation,
  useVerifymfaWithEmailMutation,
  useReverifymfaWithEmailMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useCompleteProfileMutation,
  useFindEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserProfileSettingsMutation
} = authApi;
