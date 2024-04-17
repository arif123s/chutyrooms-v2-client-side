import { baseApi } from "../../../api/baseApi";

const propertyAddApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActiveCountries: builder.query({
      query: () => ({
        url: "/ActiveCountry",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActiveDivision: builder.query({
      query: (id) => ({
        url: `/ActiveDivision/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActiveDistrict: builder.query({
      query: (id) => ({
        url: `/ActiveDistricts/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActiveArea: builder.query({
      query: (id) => ({
        url: `/ActiveAreas/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActivePaymentMethod: builder.query({
      query: () => ({
        url: "/ActivePaymentMethods",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActivePropertyType: builder.query({
      query: () => ({
        url: "/ActivepropertyType",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    addPropertyAdd: builder.mutation({
      query: (data) => {
        return {
          url: "/payment_methods",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllActiveCountriesQuery,
  useGetAllActiveDivisionQuery,
  useGetAllActiveDistrictQuery,
  useGetAllActiveAreaQuery,
  useGetAllActivePaymentMethodQuery,
  useGetAllActivePropertyTypeQuery,
  useAddPropertyAddMutation
} = propertyAddApi;
