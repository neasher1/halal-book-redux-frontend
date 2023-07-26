import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-nodejs-backend.vercel.app/',
  }),
  tagTypes: ['comments', 'products'],
  endpoints: () => ({}),
});
