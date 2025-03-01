import { USERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({   //not query because we are making a post request
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: 'POST',
        body: data,
      }),
    }),

    userProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => {
        console.log('API Response:', response);
        return response;
    },
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        
        url: `${USERS_URL}/profile`, // Fixing the URL
        method: "PUT",
        body: data,
      }),
    }),
    
 
    
  
  }),
});


//this is a naming convention for the query name 
// (u'll be using these hooks in your components to fetch data from the backend)
export const { 
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUserProfileQuery,
  useUpdateProfileMutation,
} = usersApiSlice;
