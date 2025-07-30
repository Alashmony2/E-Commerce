import React, { useEffect, useState } from 'react'
import { Button } from '@heroui/react';

export default function CartProduct({product , removeSpecificCartItem,updateProductCount}) {

    const [isLoading, setIsLoading] = useState(false)
    const [incrementIsLoading, setIncrementIsLoading] = useState(false)
    const [decrementIsLoading, setDecrementIsLoading] = useState(false)
    const [productCount, setProductCount] = useState(product.count)

    useEffect(() => {
        setProductCount(product.count)
    },[product.count])

    return (
        <div className="justify-between items-center mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 sm:flex sm:justify-start">
            <img src={product.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{product.product.title}</h2>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">${product.price}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                <Button isLoading={decrementIsLoading} onPress={() => updateProductCount(product.product._id,product.count - 1,setIncrementIsLoading,setDecrementIsLoading,product.count)}
                    className="cursor-pointer rounded-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white min-w-0 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:hover:bg-blue-600">
                        - 
                </Button>
                <input className="w-10 border border-gray-200 dark:border-gray-600 h-10 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-center text-xs outline-none focus:border-blue-500 dark:focus:border-blue-400" type="number" value={productCount} onChange={(e) => setProductCount(e.target.value)} onBlur={(e) => updateProductCount(product.product._id,e.target.value,setIncrementIsLoading,setDecrementIsLoading,product.count)} min={1} />
                <Button isLoading={incrementIsLoading}  onPress={() => updateProductCount(product.product._id,product.count + 1,setIncrementIsLoading,setDecrementIsLoading,product.count)}
                    className="cursor-pointer rounded-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white min-w-0 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:hover:bg-blue-600">
                        + 
                    </Button>
                </div>
                <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-800 dark:text-white font-semibold">${product.count * product.price}</p>
                <Button isLoading={isLoading} className='bg-transparent' onPress={() => removeSpecificCartItem(product.product._id,setIsLoading)} isIconOnly>
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </Button>
                </div>
            </div>
            </div>
        </div>
    )
}
