import { apiSlice } from "../api/apiSlice";

export const customersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get customers with stat from the server
    getCustomers: builder.query({
      query: () => `/client/customers`,
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetCustomersQuery } = customersApi;
