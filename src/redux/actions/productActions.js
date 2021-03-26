import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  UPDATE_PRICE,
  CREATE_PRODUCT,
  DELETE_PRODUCT
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
  }
};


export const updateProducts = (valueId,target) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/products/${valueId}`,target);
   // console.log(valueId)
    // console.log(target)
    // console.log(data)
    dispatch({
      type: UPDATE_PRICE,
      payload: data,
    });
  } catch (error) {
    console.log(error)
  }
};

export const deleteProduct = (valueId) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${valueId}`);
    const message="Sucessfully removed"
    dispatch({
      type: DELETE_PRODUCT,
      payload: message,
    });
  } catch (error) {
    console.log(error)
  }
};

export const createProduct = (postData) => async (dispatch) => {
  try {
    console.log("hello")
    const {data}=await axios.post(`/api/products`,postData);
    dispatch({
      type: CREATE_PRODUCT,
      payload: data,
    });
  } catch (error) {
    console.log(error)
  }
};