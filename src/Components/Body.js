import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CarCard from "./CarCard";
const Body = ({ searchData }) => {
  const homeContent = useSelector((store) => store.content.homeContent);

  // console.log("This is the home content: " + JSON.stringify(homeContent));

  const dataToDisplay = searchData || homeContent?.products;
  // console.log("This is the data to display: " + JSON.stringify(dataToDisplay));
  return dataToDisplay?.length ? (
    <div className="absolute flex flex-wrap gap-4 p-4">
      {dataToDisplay.map((product) => (
        <CarCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Body;
