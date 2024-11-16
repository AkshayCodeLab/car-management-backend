import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CarCard from "./CarCard";
import AddProductForm from "./AddProductForm";
const Body = ({ searchData }) => {
  const homeContent = useSelector((store) => store.content.homeContent);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");
  // console.log("This is the home content: " + JSON.stringify(homeContent));

  const dataToDisplay = searchData || homeContent?.products;
  // console.log("This is the data to display: " + JSON.stringify(dataToDisplay));

  return (
    <div className="relative">
      <div className="flex justify-end p-4 w-full">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {showForm ? (
        <AddProductForm token={token} onClose={() => setShowForm(false)} />
      ) : dataToDisplay?.length ? (
        <div className="absolute flex flex-wrap gap-4 p-4">
          {dataToDisplay.map((product) => (
            <CarCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div>No Products to display...</div>
      )}
    </div>
  );
};

export default Body;
