import { apiSlice } from "../apiSlice";
import { END_POINTS } from "../endpoints";

export const authAPIs = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => END_POINTS.GET_ME,
      providesTags: ["user"],
    }),

    updateMe: builder.mutation({
      query: (userData) => ({
        url: END_POINTS.UPDATE_ME,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["get_user", "user"],
    }),
    deleteMe: builder.mutation({
      query: () => ({
        url: END_POINTS.DELETE_ME,
        method: "DELETE",
      }),
      invalidatesTags: ["USER", "user"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: END_POINTS.RESET_PASSWORD,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Explicitly stringify the body
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateMeMutation,
  useDeleteMeMutation,
  useUpdatePasswordMutation,
} = authAPIs;
