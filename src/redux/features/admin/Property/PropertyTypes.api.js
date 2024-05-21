import { baseApi } from "../../../api/baseApi";

const propertyTypesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllPropertyTypes: builder.query({
        query: (currentPage) => ({
          url: `/property/property_type?page=${currentPage}`,
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
  
   
  
      getSinglePropertyType: builder.query({
        query: (id) => ({
          url:`/property/property_type/${id}/edit`,
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
  
      addPropertyType: builder.mutation({
        query: (data) => {
         
          return {
            url: "/property/property_type",
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: data,
          };
        },
      }),
  
     
  
      updatePropertyType: builder.mutation({
        query: (propertyTypeInfo) => {
          console.log("Property Type Id:",propertyTypeInfo.formData);
          return {
            url: `/property/property_type/${propertyTypeInfo.id}`,
            // method: "PUT",
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: propertyTypeInfo.formData,
          };
        },
      }),
  
    deletePropertyType: builder.mutation({
      query: (PropertyTypeId) => ({
        url: `/property/property_type/${PropertyTypeId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  
    restorePropertyType: builder.mutation({
      query: (PropertyTypeId) => ({
        url: `/property/property_type/${PropertyTypeId}/restore`,
        method: "PUT", 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  
  
    }),
  
  
  });


  export const {useGetAllPropertyTypesQuery , useAddPropertyTypeMutation , useGetSinglePropertyTypeQuery , useUpdatePropertyTypeMutation , useDeletePropertyTypeMutation , useRestorePropertyTypeMutation} = propertyTypesApi