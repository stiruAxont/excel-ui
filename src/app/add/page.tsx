"use client";

import { useState } from "react";

export default function AddRowPage() {
  const [formData, setFormData] = useState({
    segment: "",
    country: "",
    product: "",
    discountBand: "",
    unitsSold: "",
    manufacturingPrice: "",
    salePrice: "",
    grossSales: "",
    discounts: "",
    sales: "",
    cogs: "",
    profit: "",
    date: "",
    monthNumber: "",
    monthName: "",
    year: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Row added successfully!");
        setFormData({
          segment: "",
          country: "",
          product: "",
          discountBand: "",
          unitsSold: "",
          manufacturingPrice: "",
          salePrice: "",
          grossSales: "",
          discounts: "",
          sales: "",
          cogs: "",
          profit: "",
          date: "",
          monthNumber: "",
          monthName: "",
          year: "",
        });
      } else {
        const result = await response.json();
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("An error occurred.");
    }
  };

  return (
    <div>
      <h1>Add New Row</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label>
              {key}:
              <input
                type={key === "date" ? "date" : "text"}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                required={key !== "discountBand"}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
