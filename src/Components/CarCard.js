import React from "react";

const CarCard = ({ product }) => {
  const { title, description, tags, imgUrl } = product;

  return (
    <div className="w-60 h-80 bg-white shadow-lg rounded-lg overflow-hidden border flex flex-col">
      <img src={imgUrl[0]} alt={title} className="w-full h-36 object-cover" />

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 truncate">
            {description.split(" ").slice(0, 5).join(" ")}...
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
