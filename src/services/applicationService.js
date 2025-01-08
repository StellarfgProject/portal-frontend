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

  getByView: async (view, pageSize, pageIndex, searchTerm = "", filters = {}) => {
    try {
      const params = new URLSearchParams({
        view,
        pageSize,
        pageIndex,
        searchTerm,
        ...filters,
      });
  
      const response = await axiosInstance.get(`${API_URL}/applications/getAll?${params.toString()}`);
      return { ...response.data, valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error.response?.data?.error || "An unknown error occurred",
      };
    }
  },
  

   getApplicationById : async (id, view) => {

      try {
        
        const params = new URLSearchParams({guid: id, view : view});
        const response = await axiosInstance.get(`${API_URL}/applications/get?${params.toString()}`);
        return { ...response.data, valid: true };

      } catch (error) {

        return {
          valid: false,
          error: error.response?.data?.error || 'An unknown error occurred',
        };
        
      }
    },

    claimApplication: async (guid) => {
      try {
        const payload = { guid };
        const response = await axiosInstance.post(`${API_URL}/applications/claim`, payload);
        return { ...response.data, valid: true };
      } catch (error) {
        return {
          valid: false,
          error: error.response?.data?.error || 'An unknown error occurred',
        };
      }
    },

    insertStatus: async (guid, status, statusNote) => {
      try {
        const payload = {
          guid,
          status,
          status_note: statusNote, // Matches the API's expected key
        };
        const response = await axiosInstance.post(`${API_URL}/applications/status`, payload);
        return { ...response.data, valid: true };
      } catch (error) {
        return {
          valid: false,
          error: error.response?.data?.error || 'An unknown error occurred',
        };
      }
    },

    getStatuses: async (guid) => {
      try {
        const response = await axiosInstance.get(`${API_URL}/applications/status`, {
          params: { guid }, 
        });
        return { valid: true, data: response.data };
      } catch (error) {
        return {
          valid: false,
          error: error.response?.data?.error || 'An unknown error occurred',
        };
      }
    },

    getDomains: async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/applications/domains`);
        return { valid: true, data: response.data };
      } catch (error) {
        return {
          valid: false,
          error: error.response?.data?.error || 'An unknown error occurred',
        };
      }
    },

} 

export default applicationService;

