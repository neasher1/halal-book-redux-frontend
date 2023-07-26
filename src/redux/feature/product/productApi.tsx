import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/books`,
      providesTags: ['products'],
    }),
    singleProduct: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: '/books',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
    deleteBook: builder.mutation({
      query(id) {
        return {
          url: `/book/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['products'],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSingleProductQuery,
  usePostCommentMutation,
  useGetCommentQuery,
  useDeleteBookMutation,
  useEditBookMutation,
  usePostBookMutation,
} = productApi;
