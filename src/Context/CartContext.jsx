import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props){
  const [numberOfCart, setnumberOfCart] = useState(0);
  //headrToken
    let headers = {
      token: localStorage.getItem("token")
    }
    //addProductFun
    function addProductToCart(productId){
     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId : productId} ,{headers})
     .then((res)=> {setnumberOfCart(res.data.numOfCartItems)
      return res
     })
    }
    //showCartFun
    function getUserCart(){
     return   axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
     .then((res)=> {setnumberOfCart(res.data.numOfCartItems)
      return res
     })
    }
    //deleteItemFun
    function deleteItem(id){
     return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
    }
    //deleteCartFun
    function deleteCart(){
      return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
     }
    //updateCartFun
    function updateProduct(productId , newCount){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount} ,{headers})
     }
     useEffect(()=>{
      numberOfCart
      getUserCart()
    },[])
    return <CartContext.Provider value={{addProductToCart , getUserCart, deleteItem , updateProduct , deleteCart , setnumberOfCart , numberOfCart , headers}}>
        {props.children}
    </CartContext.Provider>
}