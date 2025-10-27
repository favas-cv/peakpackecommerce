import React, { useState } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function FilteringNavbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSeason,
  setSelectedSeason,
  sortOption,
  setSortOption,
}) {
  const [filterOpen, setFilterOpen] = useState(false);

  // Common modern dropdown class
  const dropdownClass =
    "appearance-none w-full px-5 py-2.5 rounded-full bg-white text-gray-700 font-medium outline-none cursor-pointer border border-gray-200 relative pr-10";

  return (
    <div className="w-full mb-6">
      {/* Search + Filter Header */}
      <div
        className="flex justify-between items-center bg-white rounded-xl px-4 py-3 relative"
        style={{
          boxShadow: "0 -4px 6px -6px rgba(0,0,0,0.3)", // shadow only on top
        }}
      >
        {/* Search Input */}
        <div className="flex items-center w-full md:w-1/2 bg-gray-100 rounded-full px-4 py-2">
          <FiSearch className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Filter Button (Visible on mobile) */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="md:hidden ml-3 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          {filterOpen ? <FiX size={22} /> : <FiFilter size={22} />}
        </button>

        {/* Desktop Filters */}
        <div className="hidden md:flex gap-3 items-center">
          {/* Category */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={dropdownClass}
            >
              <option value="All">🌍 All Categories</option>
              <option value="Trekking">🥾 Trekking</option>
              <option value="Camping">🏕️ Camping</option>
              <option value="Rainy">🌧️ Rainy</option>
              <option value="Electronics">⚙️ Gadgets</option>
              <option value="Beach-Trips">🏖️ Beach Trips</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Season */}
          <div className="relative">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className={dropdownClass}
            >
              <option value="All">🗓️ All Seasons</option>
              <option value="Summer">☀️ Summer</option>
              <option value="Winter">❄️ Winter</option>
              <option value="Rainy">🌧️ Rainy</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={dropdownClass}
            >
              <option value="None">📊 Sort By</option>
              <option value="price-low-high">💰 Price: Low → High</option>
              <option value="price-high-low">💸 Price: High → Low</option>
              <option value="name-a-z">🔤 Name: A → Z</option>
              <option value="name-z-a">🔠 Name: Z → A</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white mt-3 rounded-xl shadow-md p-4 space-y-3"
          >
            {/* Category */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full ${dropdownClass}`}
              >
                <option value="All">🌍 All Categories</option>
                <option value="Trekking">🥾 Trekking</option>
                <option value="Camping">🏕️ Camping</option>
                <option value="Rainy">🌧️ Rainy</option>
                <option value="Electronics">⚙️ Gadgets</option>
                <option value="Beach-Trips">🏖️ Beach Trips</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Season */}
            <div className="relative">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className={`w-full ${dropdownClass}`}
              >
                <option value="All">🗓️ All Seasons</option>
                <option value="Summer">☀️ Summer</option>
                <option value="Winter">❄️ Winter</option>
                <option value="Rainy">🌧️ Rainy</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={`w-full ${dropdownClass}`}
              >
                <option value="None">📊 Sort By</option>
                <option value="price-low-high">💰 Price: Low → High</option>
                <option value="price-high-low">💸 Price: High → Low</option>
                <option value="name-a-z">🔤 Name: A → Z</option>
                <option value="name-z-a">🔠 Name: Z → A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FilteringNavbar;
