import React, { useContext, useEffect, useState } from "react";
import { autContext } from "../../contexts/autContext";
import axios from "axios";
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';

export default function Orders() {
    const [isLoading, setIsLoading] = useState(false)
    const { userId } = useContext(autContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (userId) {
            getUserOrders();
        }
    }, [userId]);

    async function getUserOrders() {
        setIsLoading(true)
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setIsLoading(false)


            setOrders(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Error fetching orders:", error.response ? error.response.data : error);
        }
    }

    if(isLoading){
        return <LoadingScreen/>
    }


    return (
        <>
            

            {/* component */}
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Your Orders</h1>
                    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"></p>
                </div>
                <div className="mt-10 flex flex-col gap-8 jusitfy-center items-stretch w-full  space-y-4 md:space-y-6 xl:space-y-0">
                    {
                        orders.map((order)=>{
                            return <div key={order._id}>
                                <div  className=" flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className=" flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full hidden md:block" src={order.cartItems[0]?.product?.imageCover} alt="dress" />
                                    <img className="w-full md:hidden" src={order.cartItems[0]?.product?.imageCover} alt="dress" />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{order.cartItems[0]?.product?.title}</h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Category: </span> {order.cartItems[0]?.product?.category.name}</p>
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Brand: </span> {order.cartItems[0]?.product?.brand.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">${order.cartItems[0]?.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                            </div>
                        })
                    }
                    <div className="bg-gray-50 dark:bg-gray-800 w-full  flex justify-between items-center md:items-start px-4 py-6 md:p-6  flex-col">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                        <div className="flex flex-col md:flex-row justify-start items-stretch h-full w-full md:space-x-6 xl:space-x-[8rem] ">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                
                                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 ">{orders[0]?.user?.email}</p>
                                </div>
                            </div>
                            <div className="flex justify-between  items-stretch w-full flex-col mt-6 md:mt-0">
                                <div className="flex justify-center md:justify-start  flex-col md:space-x-6  space-y-4  md:space-y-0 md:flex-row items-center md:items-start">
                                    
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 ">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 text-center md:text-left text-sm leading-5 text-gray-600">{orders[0]?.shippingAddress?.details}</p>
                                    </div>
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 text-center md:text-left text-sm leading-5 text-gray-600">{orders[0]?.shippingAddress?.city}</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
