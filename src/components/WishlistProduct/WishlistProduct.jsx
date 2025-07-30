import { Button } from "@heroui/react";
import React, { useState } from "react";
import { addProductToCart } from "../../services/cartServices";

export default function WishlistProduct({ product, removeWishlistProduct, handleAddToCart }) {
    const [IsLoading, setIsLoading] = useState(false)
    const [IsLoadingDelete, setIsLoadingDelete] = useState(false)
    return (
        <div className="flex relative flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group ">
            <div className="w-full md:max-w-[126px]">
                <img
                    src={product?.imageCover}
                    alt={product?.title || "Product Image"}
                    className="mx-auto rounded-xl object-cover"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">
                            {product?.title || "Unknown Product"}
                        </h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">
                            {product?.category?.name || "No Category"}
                        </h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-blue-600">
                            ${product?.price || "0.00"}
                        </h6>
                    </div>
                </div>
            </div>
            <div className="space-y-9 mx-auto space-x-10 sm:space-x-0">
                <Button
                    isLoading={IsLoading}
                    onPress={async () => {
                        setIsLoading(true);
                        await handleAddToCart(product?._id);
                        setIsLoading(false);
                    }} 
                    className="cursor-pointer hover:text-blue-700 duration-400"
                ><i className="fa-solid fa-cart-shopping fa-beat"></i></Button>
                <Button
                    isLoading={IsLoadingDelete}
                    onPress={async () => {
                        setIsLoadingDelete(true);
                        await removeWishlistProduct(product?._id); 
                        setIsLoadingDelete(false); 
                    }} 
                    className="cursor-pointer hover:text-red-600 duration-400"
                ><i className="fa-solid fa-trash"></i></Button>
            </div>
        </div>
    );
}
