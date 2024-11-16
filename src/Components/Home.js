import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useFetcHomePage from "../Hooks/useFetchHomePage";
import Header from "./Header";
import Body from "./Body";
import SearchBar from "./SearchBar";
const Home = () => {
  const token = localStorage.getItem("token");

  // Fetch initial home content
  useFetcHomePage(token);

  // Manage search results
  const [searchData, setSearchData] = useState(null);

  return token ? (
    <div className="relative">
      <Header />
      <SearchBar setSearchData={setSearchData} />
      <Body searchData={searchData} />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
