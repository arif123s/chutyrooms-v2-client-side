import { baseApi } from "../../../api/baseApi";

const roomAddApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoomCategories: builder.query({
      query: (id) => ({
        url: `/owner/property/room/create?property_id=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    roomAdd: builder.mutation({
      query: (roomInfo) => {
        return {
          url: `/owner/property/room?property_id=${roomInfo.id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: roomInfo.formData,
        };
      },
    }),

    updateProperty: builder.mutation({
      query: (updatePropertyInfo) => {
        return {
          url: `/owner/property/room?property_id=${updatePropertyInfo.id}`,
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
  useGetAllRoomCategoriesQuery,
  useRoomAddMutation,
} = roomAddApi;
