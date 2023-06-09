import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get users from the server
    getUser: builder.query({
      query: (id) => `/general/users/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
