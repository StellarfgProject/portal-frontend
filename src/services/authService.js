import axiosInstance from './axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;

const authService = {
  /**
   * Login API: Handles email and password authentication
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - API response
   */
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/auth/login`, credentials);
      return { ...response.data, valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error.response?.data?.error || 'An unknown error occurred',
      };
    }
  },

  /**
   * Verify MFA API: Validates OTP
   * @param {Object} payload - { mfa_token, mfa_code }
   * @returns {Promise} - API response
   */
  verifyMfa: async (payload) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/auth/verify-mfa`, payload);
      return { ...response.data, valid: true };
    } catch (error) {
        return {
            valid: false,
            error: error.response?.data?.error || 'An error occurred while verifying MFA',
          };
    }
  },
};

export default authService;
