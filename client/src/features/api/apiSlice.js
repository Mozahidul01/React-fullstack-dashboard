/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the apiSlice using createApi from reduxjs/toolkit

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,

  // An array of tag names to be used for data invalidation and re-fetching
  tagTypes: [
    "User",
    "Products",
    "Product",
    "Customers",
    "Transactions",
    "Geography",
    "SalesOverview",
    "Admins",
    "Performance",
  ],

  // Define the endpoints
  endpoints: (builder) => ({}),
});
