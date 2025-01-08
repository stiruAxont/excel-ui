import { NextResponse } from "next/server";
import { db } from "@/db";
import { financialData } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Insert the row into the database
    await db.insert(financialData).values({
      segment: body.segment,
      country: body.country,
      product: body.product,
      discountBand: body.discountBand || null,
      unitsSold: body.unitsSold,
      manufacturingPrice: body.manufacturingPrice,
      salePrice: body.salePrice,
      grossSales: body.grossSales,
      discounts: body.discounts,
      sales: body.sales,
      cogs: body.cogs,
      profit: body.profit,
      date: body.date,
      monthNumber: body.monthNumber,
      monthName: body.monthName,
      year: body.year,
    });

    return NextResponse.json({ message: "Row added successfully!" });
  } catch (error) {
    console.error("Error adding row:", error);
    return NextResponse.json({ error: "Failed to add row." }, { status: 500 });
  }
}
