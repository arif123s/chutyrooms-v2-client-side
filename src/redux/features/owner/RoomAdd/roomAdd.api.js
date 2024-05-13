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

    addPropertyAdd: builder.mutation({
      query: (data) => {
        return {
          url: "/owner/property",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),

    getSingleRoomInfo: builder.query({
      query: (id) => ({
        url: `/owner/property/room/${id}/edit`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateProperty: builder.mutation({
      query: (updatePropertyInfo) => {
        return {
          url: `/owner/property/${updatePropertyInfo.id}`,
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
  useGetAllRoomCategoriesQuery, useGetSingleRoomInfoQuery
} = roomAddApi;
