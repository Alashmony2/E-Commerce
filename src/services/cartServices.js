import axios from "axios";
import { Bounce, toast } from "react-toastify";


export async function addProductToCart(productId,setIsLoading) {
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
}