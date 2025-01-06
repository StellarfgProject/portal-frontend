const analyticsService = {
    getSummaryData: () => [
      { name: "Jan", total: 400, incomplete: 100, weekly: 50 },
      { name: "Feb", total: 300, incomplete: 80, weekly: 45 },
      { name: "Mar", total: 500, incomplete: 150, weekly: 75 },
      { name: "Apr", total: 450, incomplete: 120, weekly: 65 },
    ],
    getDomainData: () => [
      { domain: "Finance", value: 45 },
      { domain: "Health", value: 30 },
      { domain: "Education", value: 15 },
      { domain: "Retail", value: 10 },
    ],
  };
  
  export default analyticsService;
  