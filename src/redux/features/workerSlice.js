import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createWorker = createAsyncThunk(
  "worker/createWorker",
  async ({ updatedWorkerData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createWorker(updatedWorkerData);
      toast.success("Worker added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getWorkers = createAsyncThunk(
  "worker/getWorkers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getWorkers();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getWorkersByUser = createAsyncThunk(
  "worker/getWorkersByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getWorkersByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);




const workerSlice = createSlice({
  name: "worker",
  initialState: {
    worker: {},
    workers: [],
    userWorkers: [],
    error: "",
    loading: false,
  },

  extraReducers: {
    [createWorker.pending]: (state, action) => {
      state.loading = true;
    },
    [createWorker.fulfilled]: (state, action) => {
      state.loading = false;
      state.workers = [action.payload];
    },
    [createWorker.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getWorkers.pending]: (state, action) => {
      state.loading = true;
    },
    [getWorkers.fulfilled]: (state, action) => {
      state.loading = false;
      state.workers = action.payload;
    },
    [getWorkers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getWorkersByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getWorkersByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userWorkers = action.payload;
    },
    [getWorkersByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default workerSlice.reducer;