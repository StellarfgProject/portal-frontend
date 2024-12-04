class CSVService {
    static generateCSV(headers, data, filename) {
      const csvContent = [
        headers,
        ...data.map((row) => Object.values(row)),
      ]
        .map((row) => row.join(","))
        .join("\n");
  
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  }
  
  export default CSVService;
  