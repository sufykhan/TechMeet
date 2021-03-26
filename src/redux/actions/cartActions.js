import axios from "axios"
import {ADD_TO_CART,DELETE_ORDER,ORDER_FAIL,ORDER_LIST_FAIL,ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,ORDER_REQUEST,ORDER_SUCCESS,REMOVE_TO_CART} from "../constants/cartConstants"
export const cartActions = (id,qty,selectedvendor,pri) => async(dispatch,getState)=>
{

const {data} = await axios.get(`/api/products/${id}`)
dispatch({type:ADD_TO_CART,
payload:{
    product:data._id,
    name:data.name,
    image:data.image,
    price:data.price,
    vendors:data.vendors,
    calories:data.calories,
    selectedvendor,
    qty,
    pri
}
})
localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}



export const removeFromCart=(id,selectedvendor)=>(dispatch,getState)=>{
    dispatch({
        type:REMOVE_TO_CART,
        payload:{id,selectedvendor}
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}


export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
        
    dispatch({type:ORDER_REQUEST})
    // const userLogined=getState()
    // console.log(userLogined)
    const {data}=await axios.post("/api/orders",{order})
    dispatch({type:ORDER_SUCCESS,payload:data})
    localStorage.removeItem("cartItems");
    
    }
    catch(error){
        dispatch({type:ORDER_FAIL,payload: error.reponse && error.response.data.message
        ? error.response.data.message
        : error.message})
    }
}


export const listOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
  
      const { data } = await axios.get("/api/orders");
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL,
           payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
          });
    }
  };


  export const deleteOrder = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      const message="Sucessfully removed"
      dispatch({
        type: DELETE_ORDER,
        payload: message,
      });
    } catch (error) {
      console.log(error)
    }
  };