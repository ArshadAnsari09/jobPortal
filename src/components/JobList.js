import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync, selectAllJobs } from "../redux/slice/jobSlice";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfiniteScroll from "react-infinite-scroll-component";

const JobList = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectAllJobs);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: 10, offset: 0 })); // Initial fetch
  }, [dispatch]);

  useEffect(() => {
    setFilteredJobs(jobs); // Update filteredJobs when jobs are fetched or changed
  }, [jobs]);

  const [filters, setFilters] = useState({
    companyName: "",
    location: "",
    minExperience: "",
    maxExperience: "",
    remote: false,
    techStack: "",
    role: "",
    minSalary: "",
    maxSalary: "",
  });

  const applyFilters = () => {
    let result = jobs;

    if (filters.companyName) {
      result = result.filter((job) =>
        job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      );
    }

    if (filters.location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.role) {
      result = result.filter((job) =>
        job.jobRole.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    const minExp = parseInt(filters.minExperience);
    const maxExp = parseInt(filters.maxExperience);
    const minSalary = parseInt(filters.minSalary);
    const maxSalary = parseInt(filters.maxSalary);

    if (minExp) {
      result = result.filter((job) => job.minExp >= minExp);
    }

    if (maxExp) {
      result = result.filter((job) => job.maxExp <= maxExp);
    }

    if (minSalary) {
      result = result.filter((job) => job.minJdSalary >= minSalary);
    }

    if (maxSalary) {
      result = result.filter((job) => job.maxJdSalary <= maxSalary);
    }

    setFilteredJobs(result);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loadMoreJobs = () => {
    dispatch(fetchJobsAsync({ limit: 10, offset: jobs.length }));
  };

  // let filteredJobs = applyFilters();

  return (
    <div>
      <Grid
        container
        spacing={1}
        alignItems="center"
        style={{
          marginTop: 30,
          // border: "1px solid black",
          width: "80vw",
          marginLeft: 100,
        }}
      >
        <Grid item xs={6} sm={4} md={3}>
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
        <Grid item xs={6} sm={4} md={3}>
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
        <Grid item xs={6} sm={4} md={3}>
          <TextField
            label="Min Experience"
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
        <Grid item xs={6} sm={4} md={3}>
          <TextField
            label="Max Experience" // New field for max experience
            fullWidth
            size="small"
            type="number"
            value={filters.maxExperience}
            onChange={(e) =>
              handleFilterChange("maxExperience", e.target.value)
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
        <Grid item xs={6} sm={4} md={3}>
          <TextField
            label="Min Salary"
            fullWidth
            size="small"
            type="number"
            value={filters.minJdSalary}
            onChange={(e) => handleFilterChange("minJdSalary", e.target.value)}
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
        <Grid item xs={6} sm={4} md={3}>
          <TextField
            label="Max Salary"
            fullWidth
            size="small"
            type="number"
            value={filters.maxJdSalary}
            onChange={(e) => handleFilterChange("maxJdSalary", e.target.value)}
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
        <Grid item xs={6} sm={4} md={3}>
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
        <Grid item xs={6} sm={4} md={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>
      <InfiniteScroll
        style={{ overflowY: "hidden", marginTop: 40 }}
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
