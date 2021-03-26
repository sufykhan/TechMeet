import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productDetailsReducer,productListReducer} from "./redux/reducers/productReducers"
import {addToCartReducer, orderListReducer, orderPlaceReducer} from "./redux/reducers/cartReducers"
import { customerDetailsReducer, customerListReducer } from "./redux/reducers/customerReducers";
import { vendorDetailsReducer, vendorListReducer } from "./redux/reducers/vendorReducers";

const reducer = combineReducers({
  productList:productListReducer,
  orderList:orderListReducer,
  productDetails:productDetailsReducer,
  customerList:customerListReducer,
  customerDetails:customerDetailsReducer,
  vendorList:vendorListReducer,
  vendorDetails:vendorDetailsReducer,
  cart:addToCartReducer,
  placedorder:orderPlaceReducer,
});
 const cartItemsFromStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]

const initialState = {cart:{cartItems:cartItemsFromStorage}}
const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
