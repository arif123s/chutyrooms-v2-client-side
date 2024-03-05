import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method:'POST',
        body: user,
      }),
    }),
  }),
});

export const {useLoginMutation}=authApi;