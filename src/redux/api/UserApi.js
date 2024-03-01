import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const token = sessionStorage.getItem('token')
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:4000/user',
        prepareHeaders: (headers, { getState }) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }  
    }),
    tagTypes : ['user'],
    endpoints: (builder) => ({
        userList: builder.query({
            query: (name) => `list`,
            providesTags: ['user'],
        }),
        userDetail: builder.query({
            query: (name) => `user-detail`,
            providesTags: ['single-user'],
        }),
        userUpdate: builder.mutation({
            query : (data) => ({
                url:'update',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['single-user']
        }),
        userRegisteration: builder.mutation({
            query : (data) => ({
                url:'register',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['user']
        }),
        userLogin: builder.mutation({
            query : (data) => ({
                url:'login',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['user']
        }),
    }),
})
 
export const { useUserDataQuery, useUserRegisterationMutation, useUserLoginMutation, useUserUpdateMutation, useUserDetailQuery } = userApi