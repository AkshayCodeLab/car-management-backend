import axios from "axios";
import React, { useState } from "react";

const SearchBar = ({ setSearchData }) => {
  const token = localStorage.getItem("token");
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setSearchData(null); // Reset to show all products if no keyword
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchData(response.data.products);
    } catch (error) {
      console.error("Error while searching for products:", error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
