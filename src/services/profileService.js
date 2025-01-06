const profileService = {
    changePassword: async ({ oldPassword, newPassword }) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ valid: true }); // Simulate success
        }, 1000);
      });
    },
    verifyOtp: async (otp) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (otp === "123456") resolve({ valid: true });
          else resolve({ valid: false, error: "Invalid OTP." });
        }, 1000);
      });
    },
  };
  
  export default profileService;
  