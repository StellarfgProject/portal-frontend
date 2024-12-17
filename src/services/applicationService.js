import applicationsData from '../assets/sampleData.json';
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

   getApplicationById : async (id) => {

      try {
        
        const params = new URLSearchParams({guid: id});
        const response = await axiosInstance.get(`${API_URL}/applications/get?${params.toString()}`);
        return { ...response.data, valid: true };

      } catch (error) {

        return {
          valid: false,
          error: error.response?.data?.error || 'An unknown error occurred',
        };
        
      }
    }

} 

export default applicationService;

