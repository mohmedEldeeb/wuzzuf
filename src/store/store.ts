// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slices/jobSlices";
import searchHistoryReducer from "./slices/searchHistorySlices";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    searchHistory: searchHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
