import React, { useEffect, useState } from "react";
import axios from "axios";
// import { connect, useSelector, useDispatch } from "react-redux";

const JobDetails = () => {
  // const dispatch = useDispatch();
  const [JobData, setJobData] = useState([]);
  // const { fetchJobs } = useSelector((state) => state.fetchJobs);
  // console.log("jobs", fetchJobs);

  const fetchJobData = async () => {
    const body = {
      limit: 10,
      offset: 0,
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      body,
      axiosConfig
    );
    // const dat = await dispatch(fetchJobs);
    // console.log("hggg", dat);
    console.log("data: ", data);
    if (!data) {
      return;
    }
    setJobData(data.data.jdList);
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <div>
      <h1>Inside Jobdetails</h1>
    </div>
  );
};

export default JobDetails;
