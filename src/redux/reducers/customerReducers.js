import {CREATE_CUSTOMER, DELETE_CUSTOMER, CUSTOMER_DETAILS_FAIL, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_LIST_FAIL,CUSTOMER_LIST_REQUEST,CUSTOMER_LIST_SUCCESS, UPDATE_CUSTOMER} from "../constants/customerConstants"
export const customerListReducer=(state={ customers:[] },action)=>{
    switch (action.type){
        case CUSTOMER_LIST_REQUEST:
            return {loading:true,customers:[]}
        case CUSTOMER_LIST_SUCCESS:
            return {loading:false,customers:action.payload}
        case CUSTOMER_LIST_FAIL:
            return {loading:false,error:action.payload}    
        default:
            return state            
    }
}

export const customerDetailsReducer=(state={ customer:{} },action)=>{
    switch (action.type){
        case CUSTOMER_DETAILS_REQUEST:
            return {loading:true,...state}
        case CUSTOMER_DETAILS_SUCCESS:
            return {loading:false,customer:action.payload}
        case CUSTOMER_DETAILS_FAIL:
            return {loading:false,error:action.payload}
        case UPDATE_CUSTOMER:
            return {customer:action.payload} 
        case DELETE_CUSTOMER:
            return {message:action.payload} 
        case CREATE_CUSTOMER:
            return {customer:action.payload}        
        default:
            return state            
    }
}