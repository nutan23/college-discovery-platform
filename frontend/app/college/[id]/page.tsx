"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  description: string;
  address?: string;
  website?: string;
  courses?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://college-discovery-api-ffm0.onrender.com";

export default function CollegeDetail() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCollege = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${API_URL}/colleges/${id}`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch college. Status: ${res.status}`
          );
        }

        const data = await res.json();

        setCollege(data);
      } catch (error) {
        console.error(
          "College fetch error:",
          error
        );

        setError(
          "Unable to load college details."
        );

        setCollege(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">
          🔄 Loading college details...
        </p>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

        <p className="text-red-500 text-xl mb-5">
          ❌ {error || "College not found"}
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

  const coursesArray =
    college.courses
      ? college.courses
          .split(",")
          .map((course) =>
            course.trim()
          )
          .filter(Boolean)
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

      {/* HEADER */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">

          <button
            onClick={() =>
              router.push("/colleges")
            }
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Colleges
          </button>

        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* TITLE */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <p className="text-blue-600 font-semibold mb-2">
                🎓 College Details
              </p>

              <h1 className="text-4xl font-bold text-gray-900">
                {college.name}
              </h1>

              <p className="text-gray-600 mt-3 text-lg">
                📍 {college.location}
              </p>

            </div>

            {college.website && (
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
              >
                🌐 Visit Official Website
              </a>
            )}

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <div className="text-3xl mb-2">
              💰
            </div>

            <p className="text-gray-500">
              Fees
            </p>

            <p className="text-2xl font-bold text-gray-800 mt-1">
              ₹
              {Number(
                college.fees
              ).toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <div className="text-3xl mb-2">
              ⭐
            </div>

            <p className="text-gray-500">
              Rating
            </p>

            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {college.rating}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <div className="text-3xl mb-2">
              📊
            </div>

            <p className="text-gray-500">
              Placement Rate
            </p>

            <p className="text-2xl font-bold text-green-600 mt-1">
              {college.placement_percentage}%
            </p>

          </div>

        </div>

        {/* ADDRESS */}
        <div className="bg-white rounded-2xl shadow-md p-7 mb-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📍 College Address
          </h2>

          {college.address ? (
            <>

              <p className="text-gray-700 leading-7">
                {college.address}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  college.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
              >
                🗺️ View on Google Maps →
              </a>

            </>
          ) : (
            <p className="text-gray-500">
              Address information not available.
            </p>
          )}

        </div>

        {/* COURSES */}
        <div className="bg-white rounded-2xl shadow-md p-7 mb-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            📚 Courses Offered
          </h2>

          {coursesArray.length > 0 ? (
            <div className="flex flex-wrap gap-3">

              {coursesArray.map(
                (course, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full font-medium"
                  >
                    {course}
                  </span>
                )
              )}

            </div>
          ) : (
            <p className="text-gray-500">
              Course information not available.
            </p>
          )}

        </div>

        {/* ABOUT */}
        <div className="bg-white rounded-2xl shadow-md p-7 mb-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🏫 About College
          </h2>

          <p className="text-gray-700 leading-8">
            {college.description ||
              "No description available."}
          </p>

        </div>

        {/* WEBSITE */}
        <div className="bg-white rounded-2xl shadow-md p-7">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🌐 Official Website
          </h2>

          {college.website ? (
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline break-all"
            >
              {college.website}
            </a>
          ) : (
            <p className="text-gray-500">
              Official website not available.
            </p>
          )}

        </div>

      </main>
    </div>
  );
}