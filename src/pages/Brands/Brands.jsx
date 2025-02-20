import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import axios from "axios";

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (res) => res.data.data,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {selectedBrand && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
          onClick={() => setSelectedBrand(null)}
        >
          <div
            className="relative p-6 bg-white rounded-lg shadow-lg w-[350px] md:w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#3D8D7A] mb-2">
                {selectedBrand.name}
              </h3>

              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-40 h-40 object-cover mt-3"
              />
              <button
                onClick={() => setSelectedBrand(null)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-center text-4xl font-semibold text-[#3D8D7A] mb-5">
        All Brands
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data?.map((brand, index) => (
          <div
            key={index}
            className="border border-gray-300 m-2 rounded-md hover:shadow-2xl hover:shadow-[#AAB99A] transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedBrand(brand)}
          >
            <img src={brand.image} className="object-cover" alt={brand.name} />
            <h3 className="text-center p-2 text-xl font-semibold text-[#3D8D7A] m-2">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
