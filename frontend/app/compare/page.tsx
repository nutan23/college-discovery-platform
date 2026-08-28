"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
};

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const ids = searchParams.get("ids");

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      if (!ids) {
        setError("No colleges selected for comparison.");
        setLoading(false);
        return;
      }

      const idArray = ids.split(",");

      try {
        setLoading(true);
        setError("");

        const results = await Promise.all(
          idArray.map(async (id) => {
            const res = await fetch(
              `${API_URL}/colleges/${id}`
            );

            if (!res.ok) {
              throw new Error(
                `Failed to fetch college ${id}`
              );
            }

            return res.json();
          })
        );

        setColleges(results);
      } catch (err) {
        console.error(
          "Comparison fetch error:",
          err
        );

        setError(
          "Unable to load comparison data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [ids]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">
          🔄 Loading comparison...
        </p>
      </div>
    );
  }

  if (error || colleges.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

        <p className="text-red-500 text-xl mb-5">
          ❌ {error || "No colleges found"}
        </p>

        <button
          onClick={() =>
            router.push("/colleges")
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          ← Back to Colleges
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 md:p-8">

      {/* BACK BUTTON */}

      <div className="max-w-7xl mx-auto mb-6">

        <button
          onClick={() =>
            router.push("/colleges")
          }
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Colleges
        </button>

      </div>

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        ⚖️ College Comparison
      </h1>

      {/* TABLE */}

      <div className="max-w-7xl mx-auto overflow-x-auto">

        <table className="w-full bg-white shadow-xl rounded-2xl overflow-hidden">

          <thead>
            <tr className="bg-blue-600 text-white">

              <th className="p-4 text-left">
                Features
              </th>

              {colleges.map(
                (college) => (
                  <th
                    key={college.id}
                    className="p-4 text-center"
                  >
                    {college.name}
                  </th>
                )
              )}

            </tr>
          </thead>

          <tbody className="text-gray-700">

            {/* LOCATION */}

            <tr className="border-b">

              <td className="p-4 font-semibold">
                📍 Location
              </td>

              {colleges.map(
                (college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center"
                  >
                    {college.location}
                  </td>
                )
              )}

            </tr>

            {/* FEES */}

            <tr className="border-b bg-gray-50">

              <td className="p-4 font-semibold">
                💰 Fees
              </td>

              {colleges.map(
                (college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center font-medium"
                  >
                    ₹
                    {Number(
                      college.fees
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                )
              )}

            </tr>

            {/* RATING */}

            <tr className="border-b">

              <td className="p-4 font-semibold">
                ⭐ Rating
              </td>

              {colleges.map(
                (college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center"
                  >
                    {college.rating}
                  </td>
                )
              )}

            </tr>

            {/* PLACEMENT */}

            <tr className="bg-gray-50">

              <td className="p-4 font-semibold">
                📊 Placement %
              </td>

              {colleges.map(
                (college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center text-green-600 font-semibold"
                  >
                    {
                      college.placement_percentage
                    }
                    %
                  </td>
                )
              )}

            </tr>

          </tbody>

        </table>

      </div>

      <div className="text-center mt-8">

        <button
          onClick={() =>
            router.push("/colleges")
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Compare More Colleges
        </button>

      </div>

    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          🔄 Loading comparison...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}