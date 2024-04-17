import { baseApi } from "../../../api/baseApi";

const amenitiesCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAmenitiesCategories: builder.query({
      query: () => ({
        url: "/amenities_type",
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

    getSingleAmenitiesCategory: builder.query({
      query: (id) => ({
        url:`/amenities_type/${id}/edit`,
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

    addAmenitiesCategory: builder.mutation({
      query: (data) => {
       
        return {
          url: "/amenities_type",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),

   

    updateAmenitiesCategory: builder.mutation({
      query: (amenitiesCategoryInfo) => {
        console.log("Payment Method ID:",amenitiesCategoryInfo.formData);
        return {
          url: `/payment_methods/${amenitiesCategoryInfo.id}`,
          // method: "PUT",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: amenitiesCategoryInfo.formData,
        };
      },
    }),

  deleteAmenitiesCategory: builder.mutation({
    query: (amenitiesCategoryId) => ({
      url: `/amenities_type/${amenitiesCategoryId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }),
  }),

  restoreAmenitiesCategory: builder.mutation({
    query: (amenitiesCategoryId) => ({
      url: `/amenities_type/${amenitiesCategoryId}/restore`,
      method: "PUT", // Assuming restore requires a PATCH request
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }),
  }),


  }),


});




export const { useGetAllAmenitiesCategoriesQuery , useAddAmenitiesCategoryMutation , useUpdateAmenitiesCategoryMutation , useDeleteAmenitiesCategoryMutation, useRestoreAmenitiesCategoryMutation, useGetSingleAmenitiesCategoryQuery} = amenitiesCategoriesApi;

