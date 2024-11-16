import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHomeContent } from "../Utils/contentSlice";
import SearchBar from "./SearchBar";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(setHomeContent(""));
    navigate("/home");
  };
  return (
    <div className="flex justify-between items-center h-15 w-full top-0 z-50 px-4 py-2">
      <div>Car Management App</div>
      <SearchBar />
      <button
        onClick={handleSignout}
        className="bg-red-700 text-white px-3 py-1 rounded h-10"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
