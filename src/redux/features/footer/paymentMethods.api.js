import { baseApi } from "../../api/baseApi";

const footerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivePaymentMethods: builder.query({
      query: () => ({
        url: "/activePaymentMethods",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetAllActivePaymentMethodsQuery } = footerApi;
