import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const token = sessionStorage.getItem('token') 
export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/task`, 
        prepareHeaders: (headers, { getState }) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers
        } 
    }),
    tagTypes : ['task'],
    endpoints: (builder) => ({
        perticularTaskList: builder.query({
            query: (id='') => ({
                url:`perticular-task-list/${id}`,
                method: 'GET'
            }), 
            invalidatesTags : ['task']
        }),
        taskList: builder.query({
            query: (name) => ({
                url:'task-list',
                method: 'GET'
            }),
            providesTags: ['task'],
        }),
        addTask: builder.mutation({
            query : (data) => ({
                url:'add-task',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['task']
        }),
        editTask: builder.mutation({
            query : (parameterData) => {
                const {id,...data} = parameterData
                return { 
                    url:`edit-task/${id}`,
                    method: 'PUT',
                    body:data
                }
            },
            invalidatesTags : ['task']
        }),
        deleteTask: builder.mutation({
            query : (id) => ({
                url:`delete-task/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['task']
        }),
        analysisTask: builder.query({
            query : () => ({
                url:`task-analysis`,
                method: 'GET'
            })
        }),
        updateStatusTask: builder.mutation({
            query : (parameterData) => {
                const {id,status} = parameterData
                return { 
                    url:`update-task-status/${id}`,
                    method: 'PUT',
                    body:{status}
                }
            },
            invalidatesTags : ['task']
        }),
        searchTask: builder.mutation({
            query : (searhData) => ({
                url:`search-task`,
                method: 'POST',
                body:{searhData} 
            })
        }),
        sortTask: builder.mutation({
            query : (sort) => ({
                url:`sort-task/${sort}`,
                method: 'GET'
            })
        }),
        incomingTask: builder.query({
            query : (sort) => ({
                url:`incoming-task`,
                method: 'GET'
            })
        }),
    }),
})
 
export const { useTaskListQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation, usePerticularTaskListQuery, useAnalysisTaskQuery, useUpdateStatusTaskMutation, useSearchTaskMutation, useSortTaskMutation, useIncomingTaskQuery } = taskApi