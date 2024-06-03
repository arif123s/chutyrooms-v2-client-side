import { baseApi } from "../../api/baseApi";

// const searchResultHotelApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllSearchResultHotels: builder.query({
//       query: (searchQuery) => ({
//         url: `/search?location=${searchQuery.searchInfo.location}&search_type=${searchQuery.searchInfo.search_type}&location_id=${searchQuery.searchInfo.location_id}&check_in=${searchQuery.searchInfo.check_in}&check_out=${searchQuery.searchInfo.check_out}&rooms=${searchQuery.searchInfo.rooms}&adult_guest=${searchQuery.searchInfo.adult_guest}&child_guest=${searchQuery.searchInfo.child_guest}&child_age=${searchQuery.searchInfo.child_age}`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }),
//     }),

//   }),
// });
const searchResultHotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSearchResultHotels: builder.query({
      query: (searchQuery) => {
        const { searchInfo, filterProperty } = searchQuery;

        // Serialize filter properties
        const filterParams = new URLSearchParams();

        if (filterProperty.start_price !== null)
          filterParams.append("start_price", filterProperty.start_price);
        if (filterProperty.end_price !== null)
          filterParams.append("end_price", filterProperty.end_price);
        if (filterProperty.hotel_class !== null)
          filterParams.append("hotel_class", filterProperty.hotel_class);
        if (filterProperty.guest_session_id !== null)
          filterParams.append(
            "guest_session_id",
            filterProperty.guest_session_id
          );

        //  filterParams.append(
        //    "accommodation_types",
        //    filterProperty.accommodation_types
        //  );
          if (Array.isArray(filterProperty.accommodation_types)) {
            filterParams.append(
              "accommodation_types",
              [filterProperty.accommodation_types]
            );
          }

        filterProperty.facilities.forEach((facility) => {
          filterParams.append("facilities", facility);
        });

        // Combine searchInfo and filterParams into the query string
        const queryString = new URLSearchParams({
          location: searchInfo.location,
          search_type: searchInfo.search_type,
          location_id: searchInfo.location_id,
          check_in: searchInfo.check_in,
          check_out: searchInfo.check_out,
          rooms: searchInfo.rooms,
          adult_guest: searchInfo.adult_guest,
          child_guest: searchInfo.child_guest,
          child_age: searchInfo.child_age,
          ...Object.fromEntries(filterParams),
        }).toString();
        console.log("queryString", queryString);

        return {
          url: `/search?${queryString}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
      },
    }),
  }),
});

export const { useGetAllSearchResultHotelsQuery } = searchResultHotelApi;
