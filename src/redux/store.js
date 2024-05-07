import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../redux/slice/jobSlice";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    // Add more reducers here if needed
  },
});

export default store;
