import { User } from "@prisma/client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userRecord?: User | null; // State to hold user record
  loading: boolean; // Loading state
  error: string | null; // Error state
}

const initialState: UserState = {
  userRecord: null,
  loading: false,
  error: null
};

// Async thunk to fetch user data
export const fetchUserRecord = createAsyncThunk<User, void>(
  'user/fetchUserRecord',
  async () => {
    const response = await fetch("/api/user");
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserRecord(state) {
      state.userRecord = null; // Clear the user record
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecord.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state.error = null; // Reset error
      })
      .addCase(fetchUserRecord.fulfilled, (state, action: PayloadAction<User>) => {
        state.userRecord = action.payload; // Set the user record
        state.loading = false; // Set loading to false after fetching
      })
      .addCase(fetchUserRecord.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message || 'Failed to fetch user data'; // Set error message
      });
  },
});

// Exporting actions and reducer
export const { clearUserRecord } = userSlice.actions;
export default userSlice.reducer;