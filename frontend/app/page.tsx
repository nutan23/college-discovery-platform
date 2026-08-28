"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">

      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div
            onClick={() => router.push("/")}
            className="text-2xl font-bold text-blue-700 cursor-pointer"
          >
            🎓 CollegeFinder
          </div>

          <div className="flex items-center gap-6">

            <button
              onClick={() => router.push("/")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </button>

            <button
              onClick={() => router.push("/colleges")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Explore Colleges
            </button>

            <button
              onClick={() => router.push("/colleges")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              Get Started
            </button>

          </div>

        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/college-campus.jpg')",
        }}
      >

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/40 to-purple-900/50"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-20">

          <p className="text-blue-200 font-semibold text-lg mb-4">
            🎓 Your College Journey Starts Here
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">

            Discover the Right College

            <span className="block text-blue-300">
              For Your Future
            </span>

          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-8">
            Explore colleges based on location, fees,
            ratings and placement opportunities.
            Compare multiple colleges and make better
            decisions for your education.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <button
              onClick={() => router.push("/colleges")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transition hover:-translate-y-1"
            >
              🔍 Explore Colleges
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="bg-white/20 backdrop-blur-md border border-white/50 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Learn More ↓
            </button>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16">

            <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-5">
              <p className="text-3xl font-bold">
                50+
              </p>

              <p className="text-gray-200">
                Colleges
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-5">
              <p className="text-3xl font-bold">
                5+
              </p>

              <p className="text-gray-200">
                Smart Filters
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-5">
              <p className="text-3xl font-bold">
                3
              </p>

              <p className="text-gray-200">
                Colleges Compare
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <p className="text-blue-600 font-semibold mb-2">
              PLATFORM FEATURES
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              Everything You Need in One Place
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Find and compare colleges using useful
              information such as fees, placement,
              courses, rating and location.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Search */}

            <div className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition">

              <div className="text-4xl mb-5">
                🔍
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Smart Search
              </h3>

              <p className="text-gray-600">
                Quickly search colleges using their
                name and location.
              </p>

            </div>

            {/* Filters */}

            <div className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition">

              <div className="text-4xl mb-5">
                🎯
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Advanced Filters
              </h3>

              <p className="text-gray-600">
                Filter colleges using fees, ratings,
                placement percentage and location.
              </p>

            </div>

            {/* Compare */}

            <div className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition">

              <div className="text-4xl mb-5">
                ⚖️
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Compare Colleges
              </h3>

              <p className="text-gray-600">
                Compare up to three colleges
                side-by-side before making a choice.
              </p>

            </div>

            {/* Details */}

            <div className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition">

              <div className="text-4xl mb-5">
                🎓
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                College Details
              </h3>

              <p className="text-gray-600">
                View courses, address, official website,
                fees, ratings and placements.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-20 bg-blue-700 text-white">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-5">
            Ready to Find Your College?
          </h2>

          <p className="text-blue-100 text-lg mb-8">
            Explore available colleges, compare their
            information and find the option that matches
            your goals.
          </p>

          <button
            onClick={() => router.push("/colleges")}
            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold shadow-xl transition"
          >
            Explore Colleges →
          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-gray-950 text-gray-400">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div>

              <h3 className="text-white text-xl font-bold">
                🎓 CollegeFinder
              </h3>

              <p className="mt-2">
                College Discovery & Comparison Platform
              </p>

            </div>

            <div className="flex gap-6">

              <button
                onClick={() => router.push("/")}
                className="hover:text-white"
              >
                Home
              </button>

              <button
                onClick={() => router.push("/colleges")}
                className="hover:text-white"
              >
                Colleges
              </button>

            </div>

          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
            © 2026 CollegeFinder. College Discovery Platform.
          </div>

        </div>

      </footer>

    </main>
  );
}