// services/userAuthApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers, { getState }) => {
      // Get token from state if available
      const token = getState().auth?.token?.access_token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation({
      query: (userData) => {
        return {
          url: 'api/auth/register',
          method: 'POST',
          body: userData,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      }
    }),

    // Login User
    loginUser: builder.mutation({
      query: (userData) => {
        return {
          url: 'api/auth/login',
          method: 'POST',
          body: userData,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      }
    }),

    // Get Current User (Protected Route)
    getUser: builder.query({
      query: (token) => {
        return {
          url: 'api/auth/me',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      }
    }),

    // Logout User (Protected Route)
    logoutUser: builder.mutation({
      query: (token) => {
        return {
          url: 'api/auth/logout',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      }
    }),

    // Get all users (Master only)
    getAllUsers: builder.query({
      query: (token) => {
        return {
          url: 'api/users',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      }
    }),

    // Get specific user (Self or Master)
    getUserById: builder.query({
      query: ({token, userId}) => {
        return {
          url: `api/auth/${userId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      }
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useLogoutUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery
} = userAuthApi;