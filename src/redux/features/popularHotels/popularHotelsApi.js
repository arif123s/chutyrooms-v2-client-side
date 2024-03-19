import { baseApi } from "../../api/baseApi";

const popularHotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPopularHotels: builder.query({
      query: () => ({
        url: "/country",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    //   transformResponse: (response) => {
    //     console.log("inside redux", response);

    //     return response;
    //   },
    }),
  }),
});

export const { useGetAllPopularHotelsQuery } = popularHotelApi;
