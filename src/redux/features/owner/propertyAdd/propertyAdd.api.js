import { baseApi } from "../../../api/baseApi";

const propertyAddApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivePaymentMethod: builder.query({
      query: () => ({
        url: "/ActivePaymentMethods",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActiveActivepropertyType: builder.query({
      query: () => ({
        url: "/ActivepropertyType",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    addPaymentMethod: builder.mutation({
      query: (data) => {
        return {
          url: "/payment_methods",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),
  }),
});

export const {useGetAllActivePaymentMethodQuery,useGetAllActiveActivepropertyTypeQuery}=propertyAddApi;