import React, { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { listOrders,deleteOrder} from "../../redux/actions/cartActions";

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
    if(Idd){
      dispatch(deleteOrder(Idd))
      history.push("/admin/orders")
    }
  }, [dispatch,Idd])



  return (
    <>
      <Header />
      <main className="py-3" style={{background:"#c6e7dc"}}>
        <Container>
          <Link to="/admin" className="btn btn-light my-3">
            Back
          </Link>
          <h3>Orders List</h3>
        {loading?<Loader/>:(
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Order Date</th>
                <th>Reject Order</th>
                <th>{show?"Hide Details":"Show Details"}</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order)=>{
              return (
            <>
                <tr>
                  <th>{order._id}</th>
                  <th>{order.customerName?order.customerName:order.customer}</th>
                  <th>Rs {order.cartItems.reduce((acc,item)=>acc+Number(item.qty)* Number(item.pri),0).toFixed(2)}</th>
                  <th>{order.createdAt}</th>
                  <th><Button variant="danger" onClick={()=>setIdd(order._id)}>Reject</Button></th>
                  <th><div className="btn btn-dark" onClick={()=>setShow(!show)}>{show?"Hide Details":"Show Details"}</div></th>
                </tr>
                {show?
                  <Table striped bordered hover responsive style={{background:"aliceblue"}}>
  <thead>
    <tr style={{fontWeight:"500"}}>
      <th>Product</th>
      <th>Producer</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Total Price</th>
    </tr>
  </thead>
  <tbody>
  {order.cartItems.map(({calories,image,name,pri,product,qty,selectedvendor},index)=>
  <tr>
      <td>{name}</td>
      <td>{selectedvendor}</td>
      <td>{qty}</td>
      <td>{pri}</td>
      <td>{Number(pri*qty)}</td>
    </tr>
  )}
  </tbody>
</Table>:<></>}
            </> 
              ) 
            })}
              
            </tbody>
          </Table>
        )}
          

        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Order;
