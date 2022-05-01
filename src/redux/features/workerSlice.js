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

export const deleteWorker = createAsyncThunk(
  "worker/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteWorker(id);
      toast.success("Task deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateWorker = createAsyncThunk(
  "worker/updateWorker",
  async ({ id, updatedWorkerData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateWorker(updatedWorkerData, id);
      toast.success("Task Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getWorkersByTag = createAsyncThunk(
  "tour/getWorkersByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagWorkers(tag);
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
    tagWorkers: [],
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
    [deleteWorker.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteWorker.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userWorkers = state.userWorkers.filter((item) => item._id !== id);
        state.workers = state.workers.filter((item) => item._id !== id);
      }
    },
    [deleteWorker.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateWorker.pending]: (state, action) => {
      state.loading = true;
    },
    [updateWorker.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userWorkers = state.userWorkers.map((item) =>
          item._id === id ? action.payload : item
        );
        state.workers = state.workers.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateWorker.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getWorkersByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getWorkersByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload;
    },
    [getWorkersByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default workerSlice.reducer;
