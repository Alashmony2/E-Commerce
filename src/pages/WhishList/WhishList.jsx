import axios from "axios";
import React, { useEffect, useState } from "react";
import WishlistProduct from "./../../components/WishlistProduct/WishlistProduct";
import { addProductToCart } from "../../services/cartServices";
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';

export default function Wishlist() {
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistData, setWishlistData] = useState([]);
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);

    useEffect(() => {
        getUserWishlist();
    }, []);

    async function getUserWishlist() {
        setIsLoading(true);
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: localStorage.getItem("token") },
            });
            setWishlistData(data.data || []);
            setNumOfWishlistItems(data.count || 0);
        setIsLoading(false);
    }

    async function removeWishlistProduct(productId) {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: { token: localStorage.getItem("token") },
            });
            setWishlistData((prevData) => prevData.filter(product => product._id !== productId));
            setNumOfWishlistItems((prevCount) => Math.max(prevCount - 1, 0));
    }

    async function handleAddToCart(productId) {
            await addProductToCart(productId);
            removeWishlistProduct(productId); 
    }

    if (isLoading) {
        return <LoadingScreen/>
    }

    if (numOfWishlistItems === 0) {
        return <h1 className="text-4xl font-bold text-center py-10">Your wishlist is empty</h1>;
    }

    return (
        <div className="max-w-7xl px-4 md:px-5 mx-auto ">
            <div className="lg:pr-8 pb-8 max-xl:max-w-3xl max-xl:mx-auto">
                <div className="pb-8 border-b border-gray-300">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                        Wishlist({numOfWishlistItems})
                    </h2>
                </div>
                {wishlistData.length > 0 ? (
                    wishlistData.map((product) => (
                        <WishlistProduct
                            key={product._id}
                            product={product}
                            removeWishlistProduct={removeWishlistProduct}
                            handleAddToCart={handleAddToCart}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-5">Your wishlist is empty</p>
                )}
            </div>
        </div>
    );
}
