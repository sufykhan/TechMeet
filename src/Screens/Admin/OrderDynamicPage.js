import React, { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { listOrders} from "../../redux/actions/cartActions";

const Order = () => {

  const dispatch = useDispatch()
  const orderList= useSelector(state => state.orderList)
  const {loading,error,orders}=orderList;
  const history=useHistory();

  const [show,setShow]=useState(false);
  const [Idd,setIdd]=useState(null);
  // console.log(products)
  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch])

//    const customervendor=()=>{
       const customers=orders.map(({customerName})=>customerName)
       const vendors=orders.map(({cartItems})=>cartItems.selectedvendor)
       //console.log(customers)
       const ven=orders.map((order)=>order.cartItems.map(({selectedvendor})=>selectedvendor))
       console.log(ven)
      // console.log(vendors)
       
   //}

  return (
    <>
      <Header />
      <main className="py-3" style={{background:"#ddd"}}>
        <Container>
          <Link to="/admin" className="btn btn-light my-3">
            Back
          </Link>
          <h3>Orders List</h3>
        {loading?<Loader/>:(
          <>
            {orders.map((order)=>{
              return (
                  <Table striped bordered hover responsive style={{background:"#fff"}}>
  <thead>
    <tr style={{fontWeight:"500"}}>
      <th>Product</th>
      <th>Producer</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Total Price</th>
      <th>Customer</th>
    </tr>
  </thead>
  <tbody>
  {order.cartItems.map(({calories,image,name,pri,product,qty,selectedvendor},index)=>
  <tr>
      <td>{name}</td>
      <td style={{background:"aliceblue"}}>{selectedvendor}</td>
      <td>{qty}</td>
      <td>Rs. {pri}</td>
      <td>Rs. {Number(pri*qty)}</td>
      <td style={{background:"aliceblue"}}>{order.customerName}</td>
    </tr>
  )}
  </tbody>
</Table>
)
}
)
}
           </>)}
        
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Order;
