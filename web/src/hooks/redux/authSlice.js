import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: () => initialState,
    userInfo: (state, action) => {
      state.user = action.payload.user
    },
  },
})

export const { logout, userInfo } = authSlice.actions

export default authSlice.reducer
