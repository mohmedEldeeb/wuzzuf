import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.unshift(action.payload);
    },
  },
});

export const { addSearchTerm } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
