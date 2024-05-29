import { baseApi } from "../../api/baseApi";

const searchResultHotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSearchResultHotels: builder.query({
      query: (searchInfo) => ({
        url: `/search?location=${searchInfo.location}&search_type=${searchInfo.search_type}&location_id=${searchInfo.location_id}&check_in=${searchInfo.check_in}&check_out=${searchInfo.check_out}&rooms=${searchInfo.rooms}&adult_guest=${searchInfo.adult_guest}&child_guest=${searchInfo.child_guest}&child_age=${searchInfo.child_age}`,
        method: "GET",
        headers: {  
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // updateRoom: builder.mutation({
    //   query: (updateRoomInfo) => {
    //     return {
    //       url: `/property/room/${updateRoomInfo.id}`,
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //       body: updateRoomInfo.formData,
    //     };
    //   },
    // }),
  }),
});

export const { useGetAllSearchResultHotelsQuery } = searchResultHotelApi;
