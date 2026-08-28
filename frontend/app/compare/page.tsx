"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");

  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      if (!ids) return;

      const idArray = ids.split(",");

      try {
        const results = await Promise.all(
          idArray.map((id) =>
            fetch(`http://localhost:5000/colleges/${id}`).then((res) =>
              res.json()
            )
          )
        );

        setColleges(results);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [ids]);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        🔄 Loading comparison...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-8">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        ⚖️ College Comparison
      </h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-xl rounded-2xl overflow-hidden">

          {/* Header Row */}
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-4 text-left">Features</th>
              {colleges.map((c) => (
                <th key={c.id} className="p-4 text-center">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-700">

            {/* Location */}
            <tr className="border-b">
              <td className="p-4 font-semibold">📍 Location</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 text-center">{c.location}</td>
              ))}
            </tr>

            {/* Fees */}
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-semibold">💰 Fees</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 text-center font-medium">
                  ₹{c.fees}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-b">
              <td className="p-4 font-semibold">⭐ Rating</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 text-center">
                  {c.rating}
                </td>
              ))}
            </tr>

            {/* Placement */}
            <tr className="bg-gray-50">
              <td className="p-4 font-semibold">📊 Placement %</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 text-center text-green-600 font-semibold">
                  {c.placement_percentage}%
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

      {/* Footer hint */}
      <div className="text-center mt-8 text-gray-600">
        Click back to compare more colleges
      </div>

    </div>
  );
}