import React from "react";
import { Navigate } from "react-router-dom";
import useFetcHomePage from "../Hooks/useFetchHomePage";
import Header from "./Header";
const Home = () => {
  const token = localStorage.getItem("token");

  useFetcHomePage(token);

  return token ? (
    <div className="relative">
      <Header />
      Hello
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
