import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const storeData = createSlice({
    name: 'notificationCount',
    initialState,
    reducers: {
        totalNotification: (state,action) => {
            state.value = action.payload
        },
    },
})
 
export const { totalNotification } = storeData.actions
export default storeData.reducer