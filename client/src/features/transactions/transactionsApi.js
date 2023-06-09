import { apiSlice } from "../api/apiSlice";

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get transactions with stat from the server
    getTransactions: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: `/client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
