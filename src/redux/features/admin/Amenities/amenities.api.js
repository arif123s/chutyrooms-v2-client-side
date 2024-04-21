import { baseApi } from "../../../api/baseApi";

const amenitiesApi = baseApi.injectEndpoints({
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

    getAllAmenities: builder.query({
        query: () => ({
          url: "/amenities",
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

    getSingleAmenities: builder.query({
      query: (id) => ({
        url:`/amenities/${id}/edit`,
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

    addAmenities: builder.mutation({
      query: (data) => {
       
        return {
          url: "/amenities",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),

   

    updateAmenities: builder.mutation({
      query: (amenitiesInfo) => {
        console.log("Amenities  Id:",amenitiesInfo.formData);
        return {
          url: `/amenities/${amenitiesInfo.id}`,
          // method: "PUT",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: amenitiesInfo.formData,
        };
      },
    }),

  deleteAmenities: builder.mutation({
    query: (amenitiesId) => ({
      url: `/amenities/${amenitiesId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }),
  }),

  restoreAmenities: builder.mutation({
    query: (amenitiesId) => ({
      url: `/amenities/${amenitiesId}/restore`,
      method: "PUT", 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }),
  }),


  }),


});




export const { useGetAllAmenitiesCategoriesQuery , useGetAllAmenitiesQuery , useAddAmenitiesMutation , useGetSingleAmenitiesQuery , useUpdateAmenitiesMutation ,  useDeleteAmenitiesMutation , useRestoreAmenitiesMutation} = amenitiesApi;

