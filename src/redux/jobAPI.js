export const fetchJobs = async (limit, offset) => {
  // limit = 500;
  const response = await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit,
        offset,
      }),
    }
  );
  const data = await response.json();
  return data;
};
