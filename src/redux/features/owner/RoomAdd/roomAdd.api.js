import { baseApi } from "../../../api/baseApi";

const roomAddApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoomCategories: builder.query({
      query: (id) => ({
        url: `/property/room/create?property_id=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllRooms: builder.query({
      query: (id) => ({
        url: `/property/room/?property_id=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),


    roomAdd: builder.mutation({
      query: (roomInfo) => {
        return {
          url: `/property/room?property_id=${roomInfo.id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: roomInfo.formData,
        };
      },
    }),

    getSingleRoomInfo: builder.query({
      query: (id) => ({
        url: `/property/room/${id}/edit`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateRoom: builder.mutation({
      query: (updatePropertyInfo) => {
        return {
          url: `/property/room?property_id=${updatePropertyInfo.id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: updatePropertyInfo.formData,
        };
      },
    }),
  }),
});

export const {
  useGetAllRoomCategoriesQuery, useGetAllRoomsQuery,  useGetSingleRoomInfoQuery,useRoomAddMutation,
} = roomAddApi;
