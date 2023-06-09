import { apiSlice } from "../api/apiSlice";

export const geographyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get geography  from the server
    getGeography: builder.query({
      query: () => `/client/geography`,
      providesTags: ["Geography"],
    }),
  }),
});

export const { useGetGeographyQuery } = geographyApi;
