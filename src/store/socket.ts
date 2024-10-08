import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  socket?: Socket | null;
}

const initialState: SocketState = {
  socket: undefined,
};

// New slice for socket state
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket>) => {
      state.socket = action.payload as any;
    },
  },
});

// Exporting socket actions and reducer
export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
