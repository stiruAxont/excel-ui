import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { db } from "@/db";
import { financialData } from "@/db/schema";

// Helper to convert Excel date serial numbers to JS Date
function parseExcelDate(excelDate: number): string {
  const date = new Date((excelDate - 25569) * 86400 * 1000); // Excel epoch is 1900-01-01
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const dataToInsert = rows.map((row: any) => ({
      segment: row["Segment"],
      country: row["Country"],
      product: row["Product"],
      discountBand: row["Discount Band"],
      unitsSold: row["Units Sold"],
      manufacturingPrice: row["Manufacturing Price"],
      salePrice: row["Sale Price"],
      grossSales: row["Gross Sales"],
      discounts: row["Discounts"],
      sales: row[" Sales"],
      cogs: row["COGS"],
      profit: row["Profit"],
      date: typeof row["Date"] === "number" ? parseExcelDate(row["Date"]) : row["Date"], // Convert Excel date serials
      monthNumber: row["Month Number"],
      monthName: row["Month Name"],
      year: row["Year"],
    }));

    await db.insert(financialData).values(dataToInsert);

    return NextResponse.json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading data:", error);
    return NextResponse.json({ error: "Failed to process the file" }, { status: 500 });
  }
}
