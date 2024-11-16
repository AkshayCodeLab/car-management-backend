import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHomeContent } from "../Utils/contentSlice";

const AddProductForm = ({ token, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveImage = (indexToRemove) => {
    setImgUrls((prevUrls) =>
      prevUrls.filter((_, index) => index !== indexToRemove)
    );
  };
  // Function to initialize and open the Cloudinary Upload Widget
  const openCloudinaryWidget = () => {
    if (imgUrls.length >= 10) {
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
        maxFiles: 10 - imgUrls.length,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedUrls = result.info.secure_url;
          setImgUrls((prevUrls) => {
            // Prevent adding more than 10 images
            const newImgUrls = [...prevUrls, uploadedUrls];
            if (newImgUrls.length <= 10) {
              return newImgUrls;
            } else {
              alert("You can only upload up to 10 images.");
              return prevUrls;
            }
          });
        }
      }
    );

    widget.open(); // Open the widget
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const newProduct = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      imgUrl: imgUrls,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/products/create`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the home page content
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setHomeContent(response.data));

      setLoading(false);

      onClose();
      navigate("/home");
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border w-full px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border w-full px-3 py-2 rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border w-full px-3 py-2 rounded"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Upload Images</label>
            <button
              type="button"
              onClick={openCloudinaryWidget}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={imgUrls.length >= 10}
            >
              {imgUrls.length >= 10
                ? "Maximum Images Reached"
                : "Choose Images"}
            </button>

            {imgUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {imgUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imgUrls.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {imgUrls.length}/10 images selected
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
