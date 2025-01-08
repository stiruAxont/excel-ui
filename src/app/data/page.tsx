import { db } from "@/db";
import { financialData } from "@/db/schema";

export default async function DataPage() {
  const data = await db.select().from(financialData);

  return (
    <div>
      <h1>Uploaded Data</h1>
      <table>
        <thead>
          <tr>
            <th>Segment</th>
            <th>Country</th>
            <th>Product</th>
            <th>Discount Band</th>
            <th>Units Sold</th>
            <th>Manufacturing Price</th>
            <th>Sale Price</th>
            <th>Gross Sales</th>
            <th>Discounts</th>
            <th>Sales</th>
            <th>COGS</th>
            <th>Profit</th>
            <th>Date</th>
            <th>Month Number</th>
            <th>Month Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.segment}</td>
              <td>{row.country}</td>
              <td>{row.product}</td>
              <td>{row.discountBand}</td>
              <td>{row.unitsSold}</td>
              <td>{row.manufacturingPrice}</td>
              <td>{row.salePrice}</td>
              <td>{row.grossSales}</td>
              <td>{row.discounts}</td>
              <td>{row.sales}</td>
              <td>{row.cogs}</td>
              <td>{row.profit}</td>
              <td>{row.date}</td>
              <td>{row.monthNumber}</td>
              <td>{row.monthName}</td>
              <td>{row.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
