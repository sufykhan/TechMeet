import React from "react";
import { Route } from "react-router-dom";
import Mainlogin from "./Screens/Mainlogin";
import AdminScreen from "./Screens/AdminScreen";
import Vendor from "./Screens/Admin/Vendor";
import Dish from "./Screens/Admin/Dish";
import Order from "./Screens/Admin/Order";
import Customer from "./Screens/Admin/Customer";
import CustomerScreen from "./Screens/CustomerScreen";
import CartScreen from "./Screens/CartScreen";
import OrderDynamicPage from "./Screens/Admin/OrderDynamicPage";
import VendorPage from "./Screens/Vendor/VendorPage"
import UpdateDish from "./Screens/Vendor/UpdateDish";
import DeleteDish from "./Screens/Vendor/DeleteProductVendor";
import NewProduct from "./Screens/Vendor/NewProduct";
import AddVendor from "./Screens/Vendor/AddVendor";
import AddAdminVendor from "./Screens/Admin/Vendor/AddVendor";
import AddAdminCustomer from "./Screens/Admin/Customer/AddCustomer";
import DeleteAdminVendor from "./Screens/Admin/Vendor/DeleteVendor";
import DeleteAdminCustomer from "./Screens/Admin/Customer/DeleteCustomer"
import UpdateAdminVendor from "./Screens/Admin/Vendor/UpdateVendor"
import UpdateAdminCustomer from "./Screens/Admin/Customer/UpdateCustomer"
import Success from "./Screens/Success";

const App = () => {
  return (
    <>
     
          <Route path="/" exact>
            <Mainlogin />
          </Route>

          <Route path="/admin" exact>
            <AdminScreen />
          </Route>

          <Route path="/admin/vendors" exact>
            <Vendor />
          </Route>

          <Route path="/admin/dishes" exact>
            <Dish />
          </Route>

          <Route path="/admin/orders" exact>
            <Order />
          </Route>

          <Route path="/admin/customers" exact>
            <Customer />
          </Route>

          <Route path="/admin/vendor/add/:id" exact>
            <AddAdminVendor/>
          </Route>

          <Route path="/admin/vendor/update/:id" exact>
            <UpdateAdminVendor/>
          </Route>

          <Route path="/admin/customer/update/:id" exact>
            <UpdateAdminCustomer/>
          </Route>

          <Route path="/admin/customer/add/:id" exact>
            <AddAdminCustomer/>
          </Route>

          <Route path="/admin/vendor/delete/:id?" exact>
            <DeleteAdminVendor/>
          </Route>

          <Route path="/admin/customer/delete/:id?" exact>
            <DeleteAdminCustomer/>
          </Route>

          <Route path="/customer" exact>
            <CustomerScreen/>
          </Route>

          <Route path="/cart/:id?" >
            <CartScreen/>
          </Route>
          {/* **************************** */}
          <Route path="/delivery" exact>
            <OrderDynamicPage/>
          </Route>

          <Route path="/vendor/:id" exact>
            <VendorPage/>
          </Route>

          <Route path="/vendor/update/:id?" exact>
            <UpdateDish/>
          </Route>

          <Route path="/vendor/delete/:id?" exact>
            <DeleteDish/>
          </Route>

          <Route path="/vendor/new/:id?" exact>
            <NewProduct/>
          </Route>

          <Route path="/vendor/add/:id?" exact>
            <AddVendor/>
          </Route>

          <Route path="/success" exact>
            <Success/>
          </Route>

    </>
  );
};

export default App;
