const adminService = {
    getAllDomains: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "Finance" },
            { id: 2, name: "Marketing" },
            { id: 3, name: "IT Support" },
            { id: 4, name: "Human Resources" },
            { id: 5, name: "Operations" },
          ]);
        }, 1000);
      });
    },
  };
  
  export default adminService;
  