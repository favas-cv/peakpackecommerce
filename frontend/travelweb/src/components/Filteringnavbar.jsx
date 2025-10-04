import React from 'react'

function FilteringNavbar({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSeason,
    setSelectedSeason,
    sortOption,
    setSortOption
}) {
    return (
        <div className="flex flex-wrap gap-4 mb-6 items-center">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
            />


            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
                <option value="All">All Categories</option>
                <option value="Trekking">Trekking</option>
                <option value="Camping">Camping</option>
                <option value="Rainy">Rainy</option>
                <option value="Electronics">Gadgets</option>
                <option value="Beach-Trips">Beach Trips</option>
                
            </select>


            <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
                <option value="All">All Seasons</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Rainy">Rainy</option>
            </select>


            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
                <option value="None">Sort By</option>
                <option value="price-low-high">Price: Low → High</option>
                <option value="price-high-low">Price: High → Low</option>
                <option value="name-a-z">Name: A → Z</option>
                <option value="name-z-a">Name: Z → A</option>
            </select>
        </div>
    )
}

export default FilteringNavbar
