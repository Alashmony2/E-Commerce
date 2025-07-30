import axios from "axios";
import { Bounce, toast } from "react-toastify";


export async function addProductToCart(productId, setIsLoading, setCounter = null) {
    setIsLoading(true);
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
        productId
    },{
        headers: {
            token:localStorage.getItem("token")
        }
    })
    setIsLoading(false);
    if(data.status === "success") {
        // Update counter context if provided
        if (setCounter && data.numOfCartItems) {
            setCounter(data.numOfCartItems);
        }
        toast.success(data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
    return data;
}

// Function to get current cart count
export async function getCartCount() {
    try {
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return data.numOfCartItems || 0;
    } catch (error) {
        return 0;
    }
}