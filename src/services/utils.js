import * as XLSX from "xlsx";

export const downloadExcel = (x, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(x);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, fileName + ".xlsx");
};
