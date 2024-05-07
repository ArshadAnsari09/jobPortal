import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync, selectAllJobs } from "../redux/slice/jobSlice";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfiniteScroll from "react-infinite-scroll-component";

const JobList = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectAllJobs);
  const [filters, setFilters] = useState({
    companyName: "",
    location: "",
    minExperience: "",
    remote: false,
    techStack: "",
    role: "",
    salary: "",
  });

  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: 10, offset: 0 })); // Initial fetch
  }, [dispatch]);
  console.log("Jobs", jobs);

  const applyFilters = () => {
    let filteredJobs = [...jobs];

    if (filters.companyName) {
      filteredJobs = filteredJobs.filter((job) =>
        job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      );
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.role) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobRole.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    if (filters.minExperience >= 0) {
      filteredJobs = filteredJobs.filter(
        (job) => job.minExp && job.minExp >= filters.minExperience
      );
    }

    if (filters.salary > 0) {
      filteredJobs = filteredJobs.filter(
        (job) => job.minJdSalary && job.minJdSalary >= filters.salary
      );
    }
    return filteredJobs;
  };

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const loadMoreJobs = () => {
    // Dispatch an action to fetch more jobs with an increased offset
    dispatch(fetchJobsAsync({ limit: 10, offset: jobs.length }));
  };

  let filteredJobs = applyFilters();

  return (
    <div>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 30 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Company Name"
            fullWidth
            size="small"
            value={filters.companyName}
            onChange={(e) => handleFilterChange("companyName", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Location"
            fullWidth
            size="small"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Experience"
            fullWidth
            size="small"
            type="number"
            value={filters.minExperience}
            onChange={(e) =>
              handleFilterChange("minExperience", e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Salary"
            fullWidth
            size="small"
            value={filters.salary}
            onChange={(e) => handleFilterChange("salary", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Role"
            fullWidth
            size="small"
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <InfiniteScroll
        style={{ overflowY: "hidden" }}
        dataLength={filteredJobs.length}
        next={loadMoreJobs}
        hasMore={jobs.length % 10 === 0}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredJobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            filteredJobs.map((job) => <JobCard key={job.jdUid} job={job} />)
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default JobList;
