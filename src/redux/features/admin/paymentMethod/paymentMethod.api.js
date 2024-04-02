import { baseApi } from "../../../api/baseApi";

const paymentMethodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentMethods: builder.query({
      query: () => ({
        url: "/payment_methods",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      // Define a onfulfilled handler to access the response data
      onFulfilled: (response) => {
        console.log("Response data:", response.data);
        return response; // Ensure the response continues as usual
      },
    }),

    addPaymentMethod: builder.mutation({
      query: (data) => ({
        url: "/payment_methods",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'multipart/form-data'
        },
        body: data,
      }),
    }),

    updatePaymentMethod: builder.mutation({
      query: ({ paymentMethodId, data }) => ({
        url: `/payment_methods/${paymentMethodId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useGetAllPaymentMethodsQuery,useAddPaymentMethodMutation,useUpdatePaymentMethodMutation } = paymentMethodApi;
