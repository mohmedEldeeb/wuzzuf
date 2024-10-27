// src/features/items/itemsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../services/api";
interface Item {
  id: string;
  type: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: {
      id: string;
    }[];
  };
}
interface Job {
  id: string;
  type: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: {
      id: string;
    }[];
  };
}
interface Items {
  jobs: Job[];
  meta: {
    next?: number;
    count?: number;
  };
}

interface ItemsState {
  items: Items;
  status: "idle" | "loading" | "failed" | "loadingSearch";
}

// Initial state
const initialState: ItemsState = {
  items: { jobs: [], meta: { count: 0, next: 2 } },
  status: "idle",
};

export const fetchItemsSearch = createAsyncThunk(
  "jobs/search",
  async (query: string) => {
    const response = await api.get(`jobs?query=${query}`); // Replace with your API endpoint
    return (await response.data.data) as Items;
  }
);

const searchItemsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsSearch.pending, (state) => {
        state.status = "loadingSearch";
      })
      .addCase(
        fetchItemsSearch.fulfilled,
        (state, action: PayloadAction<Items>) => {
          state.status = "idle";
          state.items.jobs = action.payload.jobs;
        }
      )
      .addCase(fetchItemsSearch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const seachItems = (state: RootState) => state.items.items;

export default searchItemsSlice.reducer;
