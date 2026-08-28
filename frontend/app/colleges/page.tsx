"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  description: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://college-discovery-api-ffm0.onrender.com";

export default function Home() {
  const router = useRouter();

  const [colleges, setColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<College[]>([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minPlacement, setMinPlacement] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH COLLEGES
  // ==========================================
  const fetchColleges = async (
    pageNum = 1,
    customValues?: {
      search?: string;
      location?: string;
      maxFees?: string;
      minRating?: string;
      minPlacement?: string;
      sort?: string;
    }
  ) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.append("page", pageNum.toString());
      params.append("limit", "10");

      const currentSearch =
        customValues?.search !== undefined
          ? customValues.search
          : search;

      const currentLocation =
        customValues?.location !== undefined
          ? customValues.location
          : location;

      const currentMaxFees =
        customValues?.maxFees !== undefined
          ? customValues.maxFees
          : maxFees;

      const currentMinRating =
        customValues?.minRating !== undefined
          ? customValues.minRating
          : minRating;

      const currentMinPlacement =
        customValues?.minPlacement !== undefined
          ? customValues.minPlacement
          : minPlacement;

      const currentSort =
        customValues?.sort !== undefined
          ? customValues.sort
          : sort;

      if (currentSearch) {
        params.append("search", currentSearch);
      }

      if (currentLocation) {
        params.append("location", currentLocation);
      }

      if (currentMaxFees) {
        params.append("maxFees", currentMaxFees);
      }

      if (currentMinRating) {
        params.append("minRating", currentMinRating);
      }

      if (currentMinPlacement) {
        params.append("minPlacement", currentMinPlacement);
      }

      if (currentSort) {
        params.append("sort", currentSort);
      }

      const res = await fetch(
        `${API_URL}/colleges?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(
          `API request failed with status ${res.status}`
        );
      }

      const data = await res.json();

      setColleges(data.results || []);
    } catch (error) {
      console.error("College fetch error:", error);

      setColleges([]);
      setError(
        "Unable to load colleges. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD + PAGINATION
  // ==========================================
  useEffect(() => {
    fetchColleges(page);
  }, [page]);

  // ==========================================
  // SELECT FOR COMPARE
  // ==========================================
  const toggleSelect = (college: College) => {
    const exists = selected.some(
      (c) => c.id === college.id
    );

    if (exists) {
      setSelected(
        selected.filter(
          (c) => c.id !== college.id
        )
      );

      return;
    }

    if (selected.length >= 3) {
      alert(
        "You can select maximum 3 colleges"
      );

      return;
    }

    setSelected([
      ...selected,
      college,
    ]);
  };

  // ==========================================
  // APPLY FILTERS
  // ==========================================
  const applyFilters = () => {
    setSelected([]);

    if (page === 1) {
      fetchColleges(1);
    } else {
      setPage(1);
    }
  };

  // ==========================================
  // RESET FILTERS
  // ==========================================
  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setMaxFees("");
    setMinRating("");
    setMinPlacement("");
    setSort("");
    setSelected([]);
    setPage(1);

    fetchColleges(1, {
      search: "",
      location: "",
      maxFees: "",
      minRating: "",
      minPlacement: "",
      sort: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 md:p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
        🎓 College Discovery Platform
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Search, filter, view details and compare colleges.
      </p>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-3 justify-center mb-6">

        <input
          type="text"
          placeholder="Search college name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyFilters();
            }
          }}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={applyFilters}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
        >
          🔍 Search
        </button>

      </div>

      {/* ADVANCED FILTERS */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          🔎 Advanced Filters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          <input
            type="text"
            placeholder="📍 Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="💰 Max Fees"
            value={maxFees}
            onChange={(e) =>
              setMaxFees(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-3"
          />

          <select
            value={minRating}
            onChange={(e) =>
              setMinRating(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-3 bg-white"
          >
            <option value="">
              ⭐ Minimum Rating
            </option>

            <option value="3">
              3.0+
            </option>

            <option value="3.5">
              3.5+
            </option>

            <option value="4">
              4.0+
            </option>

            <option value="4.5">
              4.5+
            </option>
          </select>

          <select
            value={minPlacement}
            onChange={(e) =>
              setMinPlacement(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-lg p-3 bg-white"
          >
            <option value="">
              📊 Min Placement
            </option>

            <option value="70">
              70%+
            </option>

            <option value="80">
              80%+
            </option>

            <option value="85">
              85%+
            </option>

            <option value="90">
              90%+
            </option>
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-3 bg-white"
          >
            <option value="">
              ↕ Sort By
            </option>

            <option value="fees_asc">
              Fees: Low → High
            </option>

            <option value="fees_desc">
              Fees: High → Low
            </option>

            <option value="rating_desc">
              Rating: High → Low
            </option>

            <option value="placement_desc">
              Placement: High → Low
            </option>
          </select>

        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-5">

          <button
            onClick={applyFilters}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Apply Filters
          </button>

          <button
            onClick={resetFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow"
          >
            Reset Filters
          </button>

        </div>

      </div>

      {/* COMPARE BUTTON */}
      {selected.length >= 2 && (
        <div className="text-center mb-7">

          <button
            onClick={() =>
              router.push(
                `/compare?ids=${selected
                  .map((c) => c.id)
                  .join(",")}`
              )
            }
            className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-lg shadow-lg font-semibold"
          >
            ⚖️ Compare Colleges ({selected.length})
          </button>

        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center text-lg text-gray-700 py-10">
          🔄 Loading colleges...
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-6">

          <p className="text-red-600 font-semibold">
            ❌ {error}
          </p>

          <button
            onClick={() => fetchColleges(1)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>

        </div>
      )}

      {/* NO RESULTS */}
      {!loading &&
        !error &&
        colleges.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center">

            <p className="text-xl text-gray-700">
              😕 No colleges found.
            </p>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>

          </div>
        )}

      {/* COLLEGE CARDS */}
      {!loading &&
        colleges.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {colleges.map((college) => {

              const isSelected =
                selected.some(
                  (c) =>
                    c.id === college.id
                );

              return (
                <div
                  key={college.id}
                  onClick={() =>
                    router.push(
                      `/college/${college.id}`
                    )
                  }
                  className={`bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300 border cursor-pointer
                  ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-100"
                  }`}
                >

                  <h2 className="text-xl font-bold text-blue-600 mb-3">
                    {college.name}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    📍 {college.location}
                  </p>

                  <p className="text-gray-700 mb-2">
                    💰 Fees:{" "}
                    <span className="font-semibold">
                      ₹
                      {Number(
                        college.fees
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </p>

                  <p className="text-yellow-600 font-medium mb-2">
                    ⭐ {college.rating}
                  </p>

                  <p className="text-green-600 font-semibold">
                    📊{" "}
                    {
                      college.placement_percentage
                    }
                    % Placement
                  </p>

                  <p className="text-sm text-blue-500 mt-4">
                    Click card to view details →
                  </p>

                  <div
                    className="border-t mt-4 pt-4"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >

                    <label className="flex items-center gap-2 cursor-pointer">

                      <input
                        type="checkbox"
                        checked={
                          isSelected
                        }
                        onChange={() =>
                          toggleSelect(
                            college
                          )
                        }
                        className="w-4 h-4 cursor-pointer"
                      />

                      <span className="text-gray-700 font-medium">
                        Select for Compare
                      </span>

                    </label>

                    {isSelected && (
                      <p className="text-blue-600 text-sm font-semibold mt-2">
                        ✔ Selected
                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      {/* PAGINATION */}
      <div className="mt-10 flex justify-center items-center gap-5">

        <button
          onClick={() =>
            setPage((prev) =>
              Math.max(
                prev - 1,
                1
              )
            )
          }
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="font-semibold text-gray-700">
          Page {page}
        </span>

        <button
          onClick={() =>
            setPage(
              (prev) =>
                prev + 1
            )
          }
          disabled={
            colleges.length < 10
          }
          className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>

    </div>
  );
}