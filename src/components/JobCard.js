import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const JobCard = ({ job }) => {
  const {
    companyName,
    location,
    jobDetailsFromCompany,
    jobRole,
    logoUrl,
    maxExp,
    maxJdSalary,
    minJdSalary,
    minExp,
    salaryCurrencyCode,
    jdLink,
  } = job;
  const [expanded, setExpanded] = useState(false);
  const truncatedjobDetailsFromCompany =
    jobDetailsFromCompany.length > 100
      ? jobDetailsFromCompany.substring(0, 100) + "..."
      : jobDetailsFromCompany;

  const experienceText =
    minExp && maxExp ? `${minExp} - ${maxExp} years` : "Fresher";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const capitalizeData = (data) => {
    return data.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Card style={{ width: 300, margin: 20 }}>
      <CardContent>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <Avatar src={logoUrl} alt={companyName} style={{ marginRight: 10 }} />
          <Typography variant="h6" gutterBottom>
            {companyName}
          </Typography>
        </div>
        <Typography variant="subtitle1" color="textSecondary">
          {capitalizeData(location)}
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: 10 }}>
          {/* {job.jobDetailsFromCompany} */}
          {expanded ? jobDetailsFromCompany : truncatedjobDetailsFromCompany}
          {jobDetailsFromCompany.length > 100 && (
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleExpandClick}
            >
              {expanded ? " Show less" : " Show more"}
              {/* {expanded ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )} */}
            </span>
          )}
        </Typography>
        <Typography variant="body2" style={{ marginTop: 10 }}>
          Salary: {minJdSalary} - {maxJdSalary} {salaryCurrencyCode}
        </Typography>
        <Typography variant="body2" style={{ marginTop: 10 }}>
          Experience: {experienceText}
        </Typography>
        <Typography variant="body2" style={{ marginTop: 10 }}>
          Role: {capitalizeData(jobRole)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          href={jdLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
