import { baseApi } from "../../../api/baseApi";

const propertyApi = baseApi.injectEndpoints({
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

    getSinglePaymentMethod: builder.query({
      query: (id) => ({
        url: `/payment_methods/${id}/edit`,
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

    // updatePaymentMethod: builder.mutation({
    //   query: ( {paymentMethodId, data }) => ({
    //     url: `/payment_methods/${paymentMethodId}`,
    //     method: "PUT",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //     body: data,
    //   }),
    // }),

    updatePaymentMethod: builder.mutation({
      query: (paymentInfo) => {
        console.log("Payment Method ID:", paymentInfo.formData);
        return {
          url: `/payment_methods/${paymentInfo.id}`,
          // method: "PUT",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: paymentInfo.formData,
        };
      },
    }),

    deletePaymentMethod: builder.mutation({
      query: (paymentMethodId) => ({
        url: `/payment_methods/${paymentMethodId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    restorePaymentMethod: builder.mutation({
      query: (paymentMethodId) => ({
        url: `/payment_methods/${paymentMethodId}/restore`,
        method: "PUT", // Assuming restore requires a PATCH request
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});
