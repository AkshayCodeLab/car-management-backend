import React from "react";
import { Navigate } from "react-router-dom";
import useFetcHomePage from "../Hooks/useFetchHomePage";
import Header from "./Header";
import Body from "./Body";
const Home = () => {
  const token = localStorage.getItem("token");

  useFetcHomePage(token);

  return token ? (
    <div className="relative">
      <Header />
      <Body />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
