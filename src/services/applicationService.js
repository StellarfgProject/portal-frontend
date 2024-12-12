// import applicationsData from '../assets/sampleData.json';

// const getApplications = async (filters) => {
//   // Simulate filtering on the server-side (for demonstration)
//   let filteredData = applicationsData;

//   if (filters) {
//     const { domain, state, status, dateRange } = filters;

//     if (domain) filteredData = filteredData.filter(app => app.domain.includes(domain));
//     if (state) filteredData = filteredData.filter(app => app.state === state);
//     if (status) filteredData = filteredData.filter(app => app.status === status);
//     if (dateRange) {
//       filteredData = filteredData.filter(
//         app =>
//           new Date(app.ts) >= new Date(dateRange[0]) &&
//           new Date(app.ts) <= new Date(dateRange[1])
//       );
//     }
//   }

//   return filteredData;
// };

// // Function to get application by ID
// const getApplicationById = async (id) => {
//   // Simulate finding an application by ID
//   const application = applicationsData.find(app => app.guid === id);
//   return application || {}; // Return null if no application is found
// };

// export default { getApplications, getApplicationById };


import axiosInstance from './axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;

const applicationService = {

  getDefault: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/applications/init`);
      return { ...response.data, valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error.response?.data?.error || 'An unknown error occurred',
      };
    }
  },

  getByView: async (view, pageSize, pageIndex, filters = {}) => {
    try {
      const params = new URLSearchParams({
        view,
        pageSize,
        pageIndex,
        ...filters, // Spread filters to include additional query parameters if needed
      });

      const response = await axiosInstance.get(`${API_URL}/applications/getAll?${params.toString()}`);
      return { ...response.data, valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error.response?.data?.error || 'An unknown error occurred',
      };
    }
  },

} 

export default applicationService;

