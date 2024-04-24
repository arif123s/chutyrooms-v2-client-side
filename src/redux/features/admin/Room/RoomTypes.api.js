import { baseApi } from "../../../api/baseApi";

const roomTypesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllRoomTypes: builder.query({
        query: () => ({
          url: "/room/room_type",
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
  
   
  
      getSingleRoomType: builder.query({
        query: (id) => ({
          url:`/room/room_type/${id}/edit`,
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
  
      addRoomType: builder.mutation({
        query: (data) => {
         
          return {
            url: "/room/room_type",
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: data,
          };
        },
      }),
  
     
  
      updateRoomType: builder.mutation({
        query: (roomTypeInfo) => {
          console.log("Amenities  Id:",roomTypeInfo.formData);
          return {
            url: `/room/room_type/${roomTypeInfo.id}`,
            // method: "PUT",
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: roomTypeInfo.formData,
          };
        },
      }),
  
    deleteRoomType: builder.mutation({
      query: (RoomTypeId) => ({
        url: `/room/room_type/${RoomTypeId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  
    restoreRoomType: builder.mutation({
      query: (RoomTypeId) => ({
        url: `/room/room_type/${RoomTypeId}/restore`,
        method: "PUT", 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  
  
    }),
  
  
  });


  export const {useGetAllRoomTypesQuery , useAddRoomTypeMutation , useGetSingleRoomTypeQuery , useUpdateRoomTypeMutation , useDeleteRoomTypeMutation , useRestoreRoomTypeMutation} = roomTypesApi