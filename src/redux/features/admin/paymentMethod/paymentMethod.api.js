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

    getSinglePaymentMethod: builder.query({
      query: (id) => ({
        url:`/payment_methods/${id}/edit`,
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
      query: ({data, image}) =>{
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', image); // Assuming image is a File object
        formData.append('view_order', data.view_order);
        formData.append('is_active', data.is_active);
        // return formData;
       return {
        url: "/payment_methods",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          
        },
        body: formData,
      };
      },
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




export const { useGetAllPaymentMethodsQuery,useAddPaymentMethodMutation,useUpdatePaymentMethodMutation,useGetSinglePaymentMethodQuery,useDeletePaymentMethodMutation,useRestorePaymentMethodMutation} = paymentMethodApi;
