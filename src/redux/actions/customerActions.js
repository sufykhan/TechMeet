import axios from "axios";
import { DELETE_CUSTOMER } from "../constants/customerConstants";
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  UPDATE_CUSTOMER,
  CREATE_CUSTOMER
} from "../constants/customerConstants";

export const listCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const { data } = await axios.get("/api/customers");
    dispatch({ 
      type: CUSTOMER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CUSTOMER_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
  }
};

export const listCustomerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/customers/${id}`);
    dispatch({
      type: CUSTOMER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: CUSTOMER_DETAILS_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
  }
};


export const updateCustomers = (valueId,target) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/customers/${valueId}`,target);
   // console.log(valueId)
    // console.log(target)
    // console.log(data)
    dispatch({
      type: UPDATE_CUSTOMER,
      payload: data,
    });
  } catch (error) {
    console.log(error)
  }
};

export const deleteCustomer = (valueId) => async (dispatch) => {
  try {
    await axios.delete(`/api/customers/${valueId}`);
    const message="Sucessfully removed"
    dispatch({
      type: DELETE_CUSTOMER,
      payload: message,
    });
  } catch (error) {
    console.log(error)
  }
};

export const createCustomer = (postData) => async (dispatch) => {
  try {
    console.log("hello")
    const {data}=await axios.post(`/api/customers`,postData);
    dispatch({
      type: CREATE_CUSTOMER,
      payload: data,
    });
  } catch (error) {
    console.log(error)
  }
};