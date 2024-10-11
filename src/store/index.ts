import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import tasksReducer from "./tasks";
import socketReducer from './socket'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    socket: socketReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for dispatch with correct type
export const useAppDispatch = () => useDispatch<AppDispatch>();
