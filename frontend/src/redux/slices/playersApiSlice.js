import { PLAYERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const playersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => ({
        url: PLAYERS_URL,
      }),
      keepUnusedDataFor: 300  // Cache data for 5 minutes
    }),
    
    getPlayerDetails: builder.query({
      query: (playerId) => ({
        url: `${PLAYERS_URL}/${playerId}`,
      }),
      keepUnusedDataFor: 300
    })
 
  }),
});

//this is a naming convention for the query name
export const { useGetPlayersQuery,useGetPlayerDetailsQuery } = playersApiSlice;
