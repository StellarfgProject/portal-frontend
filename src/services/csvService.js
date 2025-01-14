class CSVService {
  static generateCSV(headers, data, filename) {
    const csvContent = [
      headers,
      ...data.map((row) => headers.map((header) => row[header] || '')), // Match headers with row data
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
