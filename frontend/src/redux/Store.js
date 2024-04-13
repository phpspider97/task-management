import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {userApi} from './api/UserApi.js'
import {taskApi} from './api/TaskApi.js'
import { storeData } from './storeData/StoreData.js'
export const store = configureStore({
  reducer: {
    [storeData.reducerPath]: storeData.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(taskApi.middleware),
})

setupListeners(store.dispatch)