import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext = createContext()

export default function WishListContextProvider(props){
    const [numberOfWishList, setnumberOfWishList] = useState(0)
    let headers = {
        token: localStorage.getItem("token")
      }
    function addToWishList(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: id},{headers})
        .then((res)=>{
            setnumberOfWishList(res.data.data.length)
            return res
        })
    }
console.log(numberOfWishList);

    function getUserWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((res)=>{
        setnumberOfWishList(res.data.data.length)
            return res
        })
    }

    function removeItem(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    }

    useEffect(()=>{
        numberOfWishList
        getUserWishList()
    },[])
    return( 
    <WishListContext.Provider value={{addToWishList , getUserWishList , removeItem , numberOfWishList}}>
        {props.children}
    </WishListContext.Provider>)
}