import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';


export const networkSlice = createApi({
  reducerPath: 'networkSlice',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:3000',
  }),

  endpoints: builder => ({
    login: builder.mutation({
      query: ({body}) => ({
        url: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    getDistributors: builder.query({
      query: () => {
        return {
          url: `/api/distributors/`,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),





    getShops: builder.query({
      query: () => {
        return {
          url: `/api/shops/`,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),


    getDistributorProducts: builder.query({
      query: ({distributorId}) => {
        return {
          url: `/api/distributors/${distributorId}/products`,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),



    saveFinalData: builder.mutation({
      query: ({body}) => ({
        url: '/api/request/save',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),



    
  }),
});

export const {useLoginMutation, useLazyGetDistributorsQuery, useLazyGetShopsQuery, useLazyGetDistributorProductsQuery, useSaveFinalDataMutation} = networkSlice;
