import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import React, { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tables = [
    "Institutes",
    "Country",
    "Research_Team",
    "Project",
    "Investor",
    "Investment",
    "Institute",
    "License",
    "Model",
    "Implementation_Team",
    "Data_Collection_Team",
    "Patient",
    "Visit",
    "Hospital",
    "Data_set",
    "Application",
    "Graphic_Interface",
    "Parameter",
    "Performance",
    "Rating_Type",
    "Genomics",
  ]; // Add table names here

  const fetchData = async (tableName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/data/${tableName}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dynamic Table Data</h1>

      {/* Buttons to fetch data from different tables */}
      <div className="mb-4">
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => fetchData(table)}
            className="bg-purple-500 text-white px-4 py-2 rounded-md mr-2 mb-2 hover:bg-purple-700"
          >
            {table}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Render the table */}
      <Table data={data} />
    </div>
  );
}

function Table({ data }: { data: any[] }) {
  if (data.length === 0) {
    return <p>No data available. Click a button to fetch data.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-purple-700">
          {headers.map((header) => (
            <th
              key={header}
              className="border border-gray-300 px-4 py-2 text-left"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-purple-700">
            {headers.map((header) => (
              <td key={header} className="border border-gray-300 px-4 py-2">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
