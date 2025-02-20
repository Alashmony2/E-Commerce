import axios from 'axios'
import { createContext,useEffect,useState } from 'react'

export const autContext = createContext()
export default function AutContextProvider({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")!== null)
    const [userId, setUserId] = useState("")


    useEffect(()=>{
        if(localStorage.getItem("token")!== null){
            verifyToken()
        }
    },[])
    function verifyToken() {
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
            headers:{
                token:localStorage.getItem("token")
            }
        }).catch((err)=>{
            localStorage.removeItem("token")
            setIsLoggedIn(false)
        }).then(({data})=>{
            setUserId(data.decoded.id)
        })
    }

    return <autContext.Provider value={{isLoggedIn, setIsLoggedIn,userId}}>
        {children}
    </autContext.Provider>
}
