import axios from "axios";
import { DELETE_VENDOR } from "../constants/vendorConstants";
import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_DETAILS_FAIL,
  UPDATE_VENDOR,
  CREATE_VENDOR
} from "../constants/vendorConstants";

export const listVendors = () => async (dispatch,getState) => {
  try {
    dispatch({ type: VENDOR_LIST_REQUEST });

    const { data } = await axios.get("/api/vendors");
    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: data,
    });

    localStorage.setItem("vendorData",JSON.stringify(getState().vendorList.vendors))

  } catch (error) {
    dispatch({ type: VENDOR_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
  }
};

export const listVendorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/vendors/${id}`);
    dispatch({
      type: VENDOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: VENDOR_DETAILS_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
  }
};


export const updateVendors = (id,vendorData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/vendors/${id}`,vendorData);
   // console.log(valueId)
   //console.log(target)
    console.log(data)
    dispatch({
      type: UPDATE_VENDOR,
      payload: data,
    });
  } catch (error) {
    console.log(error)
  }
};

export const deleteVendor = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/vendors/${id}`);
    const message="Sucessfully removed"
    dispatch({
      type: DELETE_VENDOR,
      payload: message,
    });
  } catch (error) {
    console.log(error)
  }
};

export const createVendor = (postData) => async (dispatch) => {
  try {
    console.log("hello")
    const {data}=await axios.post(`/api/vendors`,postData);
    dispatch({
      type: CREATE_VENDOR,
      payload: data,
    });
  } catch (error) {
    console.log(error)
  }
};