import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserType {
  name: string | null
  email: string
  teamId: string | null
}
interface UserState {
  userRecord?: UserType | null // State to hold user record
  loading: boolean // Loading state
  error: string | null // Error state
}

const initialState: UserState = {
  userRecord: null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.userRecord = action.payload // Set the user record with the provided payload
    },
    clearUserRecord(state) {
      state.userRecord = null // Clear the user record
    }
  }
})

// Exporting actions and reducer
export const { clearUserRecord, setUser } = userSlice.actions
export default userSlice.reducer
