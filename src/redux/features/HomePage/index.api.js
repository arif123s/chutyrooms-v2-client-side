import { baseApi } from "../../api/baseApi";

const homePageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    homePageData: builder.query({
      query: () => ({
        url: "/index_app",
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
  }),
});

export const { useHomePageDataQuery } = homePageApi;