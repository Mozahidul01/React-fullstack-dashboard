import { apiSlice } from "../api/apiSlice";

export const salesOverviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get salesOverview with stat from the server
    getSalesOverview: builder.query({
      query: () => `/sales/saleStat`,
      providesTags: ["SalesOverview"],
    }),
  }),
});

export const { useGetSalesOverviewQuery } = salesOverviewApi;
