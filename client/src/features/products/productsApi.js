import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get products with stat from the server
    getProducts: builder.query({
      query: () => `/client/products_stat`,
      providesTags: ["Products"],
    }),

    // Endpoint for get product by id from the server
    getProduct: builder.query({
      query: (id) => `/client/products/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
