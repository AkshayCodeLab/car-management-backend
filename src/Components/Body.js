import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CarCard from "./CarCard";
const Body = () => {
  const data = useSelector((store) => store.content.homeContent);

  console.log(data);
  return data.length !== 0 ? (
    <div className="absolute flex flex-wrap gap-4 p-4">
      {data?.products.map((product) => (
        <CarCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Body;
