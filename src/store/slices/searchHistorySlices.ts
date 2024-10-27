import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Initial state
const initialState: string[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "C#",
];

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      // add in the first position;
      state.unshift(action.payload);
      //   state.push(action.payload);
    },
  },
});

export const { addSearchTerm } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
