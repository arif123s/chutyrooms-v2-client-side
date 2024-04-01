import { baseApi } from "../../../api/baseApi";

const paymentMethodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentMethod: builder.query({
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
  }),
});

export const {usePaymentMethodQuery} = paymentMethodApi;