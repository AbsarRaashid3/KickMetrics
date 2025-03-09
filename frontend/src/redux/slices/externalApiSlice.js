import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EXTERNAL_API_URL } from '../../constants';

export const externalApiSlice = createApi({
  reducerPath: 'externalApi',

  baseQuery: fetchBaseQuery({ 
    baseUrl: EXTERNAL_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUserDashboard: builder.query({
      query: () => ({
        url: `/getLeaguesCurrentSeasonUpcoming`,
        
      }),
    }),

    getCoachDashboard: builder.query({
      query: () => ({
        url: `/getCoachesPlayersTeamsCountries`,
        
      }),
    }),
    
    getScoutDashboard: builder.query({
      query: () => ({
        url: `/getTransfers`,

      }),
    }),

    getFavorites: builder.query({
      query: () => ({
        url:'/favorites',
        method: 'GET',
    }),
    keepUnusedDataFor: 5,
  }),

  addFavorite: builder.mutation({
      query: (playerId) => ({
        url: '/favorites',
        method: 'POST',
        body: {playerId:playerId}
      }),
      invalidatesTags: ['FavPlayers']
    }),

    removeFavorite: builder.mutation({
      query: (playerId) => ({
        url: `/favorites/${playerId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['FavPlayers']
    }),
  }),
  
});

export const { useGetCoachDashboardQuery,useGetUserDashboardQuery,useAddFavoriteMutation,useGetFavoritesQuery,useRemoveFavoriteMutation,useGetScoutDashboardQuery } = externalApiSlice;
