import { apiSlice } from "../api/apiSlice";

export const adminsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get admins from the server
    getAdmins: builder.query({
      query: () => `/management/admins`,
      providesTags: ["Admins"],
    }),
  }),
});

export const { useGetAdminsQuery } = adminsApi;
