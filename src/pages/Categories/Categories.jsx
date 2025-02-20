import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';

export default function Categories() {

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  const { data , isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (res) => res.data.data
  })
  
  if(isLoading){
    return <LoadingScreen/>
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {
          data?.map((category, index) => {
            return <div key={index} className="border border-gray-300 m-2 w-fit rounded-md hover:shadow-2xl hover:shadow-[#AAB99A] transition-all  duration-500">
                <img src={category.image} className='object-cover  h-80 w-96' alt={category.name} />
                <h3 className='text-center p-2 text-3xl font-semibold text-[#3D8D7A] m-2'>{category.name}</h3>
            </div>
          })
        }
      </div>
    </div>
  )
}
