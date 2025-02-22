import React, { useContext, useEffect, useState } from "react";
import { autContext } from "../../contexts/autContext";
import axios from "axios";
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';

export default function Orders() {
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useContext(autContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (userId) {
            getUserOrders();
        } else {
            setOrders([]);
        }
    }, [userId]);

    async function getUserOrders() {
        setIsLoading(true);
        setOrders([]);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoading(false);
                return;
            }

            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching orders:", error.response ? error.response.data : error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Your Orders
                </h1>
            </div>

            <div className="mt-10 flex flex-col gap-8 justify-center items-stretch w-full space-y-4 md:space-y-6 xl:space-y-0">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 border-b pb-6">

                            <p className="text-sm text-gray-600 dark:text-gray-300">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Customer Info</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Email: {order.user?.email || "No email available"}
                                </p>
                            </div>

                            {order.cartItems.map((item) => (
                                <div key={item._id} className="flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                    <div className="w-24 h-24">
                                        <img className="w-full h-full object-cover" src={item.product?.imageCover} alt={item.product?.title} />
                                    </div>
                                    <div className="flex-1 flex flex-col space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.product?.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Category: {item.product?.category?.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Brand: {item.product?.brand?.name}</p>
                                        <p className="text-base font-medium text-gray-800 dark:text-white">${item.price}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Shipping & Billing Details</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Shipping Address: {order.shippingAddress?.details || "Not available"}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Billing Address: {order.shippingAddress?.city || "Not available"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-300">No orders found.</p>
                )}
            </div>
        </div>
    );
}
