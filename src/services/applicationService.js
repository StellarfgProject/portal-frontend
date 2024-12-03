import applicationsData from '../assets/sampleData.json';

const getApplications = async (filters) => {
  // Simulate filtering on the server-side (for demonstration)
  let filteredData = applicationsData;

  if (filters) {
    const { domain, state, status, dateRange } = filters;

    if (domain) filteredData = filteredData.filter(app => app.domain.includes(domain));
    if (state) filteredData = filteredData.filter(app => app.state === state);
    if (status) filteredData = filteredData.filter(app => app.status === status);
    if (dateRange) {
      filteredData = filteredData.filter(
        app =>
          new Date(app.ts) >= new Date(dateRange[0]) &&
          new Date(app.ts) <= new Date(dateRange[1])
      );
    }
  }

  return filteredData;
};

export default { getApplications };
