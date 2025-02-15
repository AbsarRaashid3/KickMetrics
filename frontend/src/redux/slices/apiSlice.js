import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../constants';

const baseQuery= fetchBaseQuery({ baseUrl: BASE_URL}); // Base URL for all requests

// Define the base API slice
export const apiSlice = createApi({
baseQuery,
tagTypes: ['Player','User'], // Tag types for caching and invalidation
  endpoints: (builder) => ({}),
 
});

