import axios from "axios";
import { useEffect, useState } from "react";
import Product from './../../components/Product/Product';
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';
export default function Home() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    getAllData()
  },[])

  async function getAllData(){
    setIsLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setProducts(data.data);
    setIsLoading(false)
  }

  if(isLoading){
    return <LoadingScreen/>
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-5">
        {
          products.map((product,index)=>{
              return <Product product={product} key={index}/>
          })
        }
      </div>
    </>
  )
}
