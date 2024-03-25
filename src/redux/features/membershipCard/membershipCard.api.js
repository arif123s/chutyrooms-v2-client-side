import { baseApi } from "../../api/baseApi";

const membershipCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    membershipCard: builder.query({
      query: () => ({
        url: "/memberships",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      // Define a onfulfilled handler to access the response data
      onFulfilled: (response) => {
        console.log("Response data:", response.data); // Logging the response data
        return response; // Ensure the response continues as usual
      },
    }),
  }),
});

export const { useMembershipCardQuery } = membershipCardApi;
