import {CREATE_VENDOR, DELETE_VENDOR, VENDOR_DETAILS_FAIL, VENDOR_DETAILS_REQUEST, VENDOR_DETAILS_SUCCESS, VENDOR_LIST_FAIL,VENDOR_LIST_REQUEST,VENDOR_LIST_SUCCESS, UPDATE_VENDOR} from "../constants/vendorConstants"
export const vendorListReducer=(state={ vendors:[] },action)=>{
    switch (action.type){
        case VENDOR_LIST_REQUEST:
            return {loading:true,vendors:[]}
        case VENDOR_LIST_SUCCESS:
            return {loading:false,vendors:action.payload}
        case VENDOR_LIST_FAIL:
            return {loading:false,error:action.payload}    
        default:
            return state            
    }
}

export const vendorDetailsReducer=(state={ vendor:{} },action)=>{
    switch (action.type){
        case VENDOR_DETAILS_REQUEST:
            return {loading:true,...state}
        case VENDOR_DETAILS_SUCCESS:
            return {loading:false,vendor:action.payload}
        case VENDOR_DETAILS_FAIL:
            return {loading:false,error:action.payload}
        case UPDATE_VENDOR:
            return {vendor:action.payload} 
        case DELETE_VENDOR:
            return {message:action.payload} 
        case CREATE_VENDOR:
            return {vendor:action.payload}        
        default:
            return state            
    }
}