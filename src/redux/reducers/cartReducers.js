import {ADD_TO_CART,DELETE_ORDER,ORDER_FAIL,ORDER_LIST_FAIL,ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,ORDER_REQUEST,ORDER_SUCCESS,REMOVE_TO_CART} from "../constants/cartConstants"
 
export const addToCartReducer=(state={cartItems:[]},action)=>{
    switch (action.type)
    {
        case ADD_TO_CART:
            const item=action.payload;
            const existItem=state.cartItems.find(x=>(x.product===item.product && x.selectedvendor===item.selectedvendor))
             
            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map(x=>x.product===item.product?item:x)
                }
            }
            else{
                return {...state,cartItems:[...state.cartItems,item]}
            }
        case REMOVE_TO_CART:
            const {id,selectedvendor}=action.payload
            return{
                ...state,cartItems:state.cartItems.filter((x)=>(x.product!==id && x.selectedvendor===selectedvendor))
            }  
        case DELETE_ORDER:
            return {message:action.payload}    
        default:
            return state    
    }
}

export const orderPlaceReducer=(state={order:{}},action)=>{
    switch (action.type)
    {
        case ORDER_REQUEST:
            return {loading:true}
        case ORDER_SUCCESS:
            return {loading:false,success:true,order:action.payload}
        case ORDER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state    
    }
}


export const orderListReducer=(state={ orders:[] },action)=>{
    switch (action.type){
        case ORDER_LIST_REQUEST:
            return {loading:true,orders:[]}
        case ORDER_LIST_SUCCESS:
            return {loading:false,orders:action.payload}
        case ORDER_LIST_FAIL:
            return {loading:false,error:action.payload}    
        default:
            return state            
    }
}

