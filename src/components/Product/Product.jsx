import { Button } from '@heroui/react'
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { addProductToCart } from '../../services/cartServices';
import { formatCurrency } from '../../helpers/currencyHelpers';
import { addProductToWhishlist } from '../../services/whishlistServices';
import { counterContext } from '../../contexts/counterContext';


export default function Product({ product }) {

    const [isLoading, setIsLoading] = useState(false)
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { setCounter } = useContext(counterContext);


    return (
        <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-500 hover:scale-105">
            <Link className="relative mx-3 mt-3 flex overflow-hidden rounded-xl" to={"/productDetails/" + product._id}>
                <img className="object-contain w-full" src={product.imageCover} alt={product.title} />
                {product.priceAfterDiscount && <span className="absolute top-0 left-0 m-2 rounded-full bg-black dark:bg-red-600 px-2 text-center text-sm font-medium text-white">{100 - Math.round(product.priceAfterDiscount * 100 / product.price)}% OFF</span>}
            </Link>
            <div className="mt-4 px-5 pb-5 grow flex flex-col justify-between">
                <div className="">
                    <Link to={"/productDetails/" + product._id}>
                        <h5 className="text-xl tracking-tight text-slate-900 dark:text-white line-clamp-1">{product.title}</h5>
                    </Link>
                    <div className="mt-2 mb-5">
                        <p>
                            {
                                product.priceAfterDiscount ?
                                    <>
                                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(product.priceAfterDiscount)}</span>
                                        <span className="text-sm text-slate-900 dark:text-gray-400 line-through">{formatCurrency(product.price)}</span>
                                    </>
                                    :
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(product.price)}</span>
                            }
                        </p>
                        <div className="flex items-center">
                            {
                                [1, 2, 3, 4, 5].map((rate, index) => {
                                    return product.ratingsAverage >= rate ?
                                        <svg key={index} aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        :
                                        <svg key={index} aria-hidden="true" className="h-5 w-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                })
                            }
                            <span className="mr-2 ml-3 rounded bg-yellow-200 dark:bg-yellow-600 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:text-white">{product.ratingsAverage}</span>
                        </div>
                    </div>
                </div>
                <Button isLoading={isLoading} onPress={() => addProductToCart(product._id, setIsLoading, setCounter)} className="flex mb-1 items-center justify-center rounded-md bg-slate-900 dark:bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart</Button>
                <Button 
                    isLoading={isAddingToWishlist} 
                    onPress={async () => {
                        await addProductToWhishlist(product._id, setIsAddingToWishlist);
                        setIsInWishlist(true);
                    }} 
                    className="flex items-center justify-center rounded-md bg-slate-900 dark:bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-gray-600 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isInWishlist ? "white" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>
                    Add to wishlist
                </Button>
            </div>
        </div>
    )
}
