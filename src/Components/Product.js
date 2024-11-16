import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel.js"; // Adjust the import path as needed
import axios from "axios";

const Product = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imgUrl: [],
  });

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

  const openCloudinaryWidget = () => {
    if (formData.imgUrl.length >= 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
        uploadPreset: process.env.REACT_APP_PRESET,
        multiple: true,
        showAdvancedOptions: false,
        cropping: true,
        croppingAspectRatio: 1,
        resourceType: "image",
        maxFileSize: 5000000,
        maxFiles: 10 - formData.imgUrl.length,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedUrl = result.info.secure_url;
          setFormData((prev) => ({
            ...prev,
            imgUrl: [...prev.imgUrl, uploadedUrl],
          }));
        }
      }
    );

    widget.open();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product deleted successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      imgUrl: prev.imgUrl.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/products/update/${id}`,
        {
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
          // imgUrl is already an array, no need to split
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product updated successfully!");
      setIsEditing(false);
      fetchProduct();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product.");
    }
  };

  const startEditing = () => {
    setFormData({
      title: product.title,
      description: product.description,
      tags: product.tags.join(", "),
      imgUrl: product.imgUrl, // Keep as array
    });
    setIsEditing(true);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {!isEditing ? (
        <>
          <ImageCarousel images={product.imgUrl} />
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
          <div className="flex gap-4 mt-6">
            <button
              onClick={startEditing}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border px-4 py-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Tags (comma-separated)"
            className="border px-4 py-2 rounded"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Images</label>
            <button
              type="button"
              onClick={openCloudinaryWidget}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={formData.imgUrl.length >= 10}
            >
              Upload Images
            </button>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {formData.imgUrl.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Product;
