import { pgTable, varchar, integer, numeric, date } from "drizzle-orm/pg-core";

export const financialData = pgTable("financial_data", {
  segment: varchar("segment"),
  country: varchar("country"),
  product: varchar("product"),
  discountBand: varchar("discount_band"),
  unitsSold: numeric("units_sold"),
  manufacturingPrice: numeric("manufacturing_price"),
  salePrice: numeric("sale_price"),
  grossSales: numeric("gross_sales"),
  discounts: numeric("discounts"),
  sales: numeric("sales"),
  cogs: numeric("cogs"),
  profit: numeric("profit"),
  date: date("date"),
  monthNumber: integer("month_number"),
  monthName: varchar("month_name"),
  year: integer("year"),
});
