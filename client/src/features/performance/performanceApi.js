import { apiSlice } from "../api/apiSlice";

export const performanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get performance by id from the server
    getPerformance: builder.query({
      query: (id) => `/management/performance/${id}`,
      providesTags: ["Performance"],
    }),
  }),
});

export const { useGetPerformanceQuery } = performanceApi;
