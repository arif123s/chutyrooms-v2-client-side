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
      query: ({data, image}) =>{
        // const formData = new FormData();
// formData.append('name', inputValue.name);
// formData.append('image', inputValue.image); // Assuming inputValue.image is a File object
// formData.append('view_order', inputValue.view_order);
// formData.append('is_active', inputValue.is_active.toString());


// Object.keys(data).forEach(key => {
//     // formData.append(key, inputValue[key]);
//     const value = data[key];
//     if (value instanceof File) {
//         formData.append(key, value, value.name); // If the value is a File object
//     } else {
//         formData.append(key, String(value)); // Convert value to string
//     }
// });


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
  }),
});

export const { useGetAllPaymentMethodsQuery,useAddPaymentMethodMutation,useUpdatePaymentMethodMutation } = paymentMethodApi;
