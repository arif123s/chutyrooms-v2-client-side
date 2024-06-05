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
        const { searchInfo, filterProperty, currentPage } = searchQuery;
        // Serialize filter properties
        const filterParams = new URLSearchParams();
        // console.log('filterProperty',filterProperty)
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

        // if (filterProperty.accommodation_types.length) {
        //   const accommodationTypesString = `[${filterProperty.accommodation_types.join(
        //     ","
        //   )}]`;
        //   filterParams.append("accommodation_types", accommodationTypesString);
        // }

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
          // ...Object.fromEntries(filterParams),
          ...Object.fromEntries(filterParams.entries()),
        }).toString();

        let apiUrl = `/search?${queryString}`;
       
       if (
         filterProperty.accommodation_types &&
         filterProperty.accommodation_types.length > 0
       ) {
         const accommodationTypesString = `${filterProperty.accommodation_types.join(
           ","
         )}`;
         apiUrl += `&accommodation_types[]=${accommodationTypesString}`;
       }

        if (filterProperty.facilities && filterProperty.facilities.length > 0) {
          const facilitiesTypesString = `${filterProperty.facilities.join(
            ","
          )}`;
          apiUrl += `&amenities_side[]=${facilitiesTypesString}`; 
        }

        console.log("queryString", apiUrl);

        return {
          // url: `/search?${queryString}`,
          url: `${apiUrl}&page=${currentPage}`,
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
