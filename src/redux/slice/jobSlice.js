import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "../jobAPI";

const initialState = {
  jobs: [],
  status: "idle",
  error: null,
  // hasMore: true,
};

export const fetchJobsAsync = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ limit, offset }) => {
    const response = await fetchJobs(limit, offset);
    return response;
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Check if the received data contains new jobs or duplicates
        const uniqueJobs = action.payload.jdList.filter(
          (newJob) =>
            !state.jobs.some(
              (existingJob) => existingJob.jdUid === newJob.jdUid
            )
        );
        state.jobs = [...state.jobs, ...uniqueJobs];
        // const newJobs = action.payload.jdList;
        // state.jobs = [...state.jobs, ...newJobs];
        // state.hasMore = newJobs.length > 0;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllJobs = (state) => state.jobs.jobs;

export default jobSlice.reducer;
