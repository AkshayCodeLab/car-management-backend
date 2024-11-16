import React, { useState } from "react";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = () => {
    console.log("This is the keyword: " + keyword);
  };
  return (
    <div className="">
      <input
        placeholder="search..."
        className="border-black border px-4 py-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSubmit} className="border m-3">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
