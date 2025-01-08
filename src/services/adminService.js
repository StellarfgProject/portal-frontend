const adminService = {
    getAllDomains: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "Credit Union Of New Jersey" },
            { id: 2, name: "BELCO Auto" },
            { id: 3, name: "OECU" },
            { id: 4, name: "Ohio Valley Credit Union" },
            { id: 5, name: "Tremont Credit Union" },
          ]);
        }, 1000);
      });
    },
  };
  
  export default adminService;
  