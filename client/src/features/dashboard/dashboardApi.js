import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get dashboard with stat from the server
    getDashboard: builder.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
