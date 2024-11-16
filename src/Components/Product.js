import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <img
        src={product.imgUrl[0]}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-2xl font-semibold mt-4">{product.title}</h2>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {product.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Product;
