import { baseApi } from "../../../api/baseApi";

const propertyAddApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPropertycAddingProperties: builder.query({
      query: () => ({
        url: "/owner/property/create",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

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
        url: `/countryWiseDivision/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActiveDistrict: builder.query({
      query: (id) => ({
        url: `/divisionWiseDistricts/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllActiveArea: builder.query({
      query: (id) => ({
        url: `/districtWiseAreas/${id}`,
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

    getAllActiveAmenities: builder.query({
      query: (id) => ({
        url: `/ActiveAmenities/${id}`,
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
  }),
});

export const {
  useGetAllPropertycAddingPropertiesQuery,
  // useGetAllActiveCountriesQuery,
  useGetAllActiveDivisionQuery,
  useGetAllActiveDistrictQuery,
  useGetAllActiveAreaQuery,
  useAddPropertyAddMutation
} = propertyAddApi;
