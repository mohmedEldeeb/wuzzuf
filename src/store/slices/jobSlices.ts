import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../services/api";
// interface Item {
//   id: string;
//   type: string;
//   attributes: {
//     title: string;
//   };
//   relationships: {
//     skills: {
//       id: string;
//     }[];
//   };
// }
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
  status: "idle" | "loading" | "failed" | "lodingMore";
  count: number;
}

const initialState: ItemsState = {
  items: { jobs: [], meta: { count: 0, next: 2 } },
  status: "idle",
  count: 1,
};

export const fetchItems = createAsyncThunk("jobs/fetch", async () => {
  const response = await api.get(`jobs?cursor=1&limit=12`);
  return (await response.data.data) as Items;
});

export const fetchItemsNext = createAsyncThunk("jobs/fetchNext", async () => {
  const response = await api.get(`jobs?cursor=${initialState.count}&limit=12`); // Replace with your API endpoint
  return (await response.data.data) as Items;
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Items>) => {
        state.status = "idle";
        state.items.jobs = action.payload.jobs;
        state.count = state.count + 1;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(fetchItemsNext.pending, (state) => {
        state.status = "lodingMore";
      })
      .addCase(
        fetchItemsNext.fulfilled,
        (state, action: PayloadAction<Items>) => {
          state.status = "idle";
          state.items.jobs = state.items.jobs.concat(action.payload.jobs);
          state.items.meta = action.payload.meta;
          state.count = state.count + 1;
          state.status = "idle";
        }
      )
      .addCase(fetchItemsNext.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectItems = (state: RootState) => state.items.items;

export default itemsSlice.reducer;
