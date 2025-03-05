import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EXTERNAL_API_URL } from '../../constants';

export const externalApiSlice = createApi({
  reducerPath: 'externalApi',

  baseQuery: fetchBaseQuery({ 
    baseUrl: EXTERNAL_API_URL,
  }),

  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: `/getCountries`,
      }),
    }),

    getLeagues: builder.query({
      query: () => ({
        url: `/getLeagues`,
        
      }),
    }),
  }),
  
});

export const { useGetCountriesQuery,useGetLeaguesQuery } = externalApiSlice;
