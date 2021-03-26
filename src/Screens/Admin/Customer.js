import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory} from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { listCustomers } from "../../redux/actions/customerActions";

const Customer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers } = customerList;
  
  
  useEffect(() => {
    dispatch(listCustomers());
  }, [dispatch]);


  const [show, setShow] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState();

  const SubmitCustomer = (e) => {
    e.preventDefault();
    if(customers.find((customer)=>customer.name.toLowerCase()===customerName.toLowerCase())){
      setMessage("Customer Already Exists")
      setShow(false)
    }
    else{
      history.push(`/admin/customer/add/${customerName}`)
    }
    //console.log(dishName)
    // const d = vendors.find(
    //   ({ name }) => name.toLowerCase() === vendorName.toLowerCase()
    // );
    // if (!d) {
    //   history.push(`/vendor/new/${id}?vendor=${vendorName}`);
    // } else {
    //   if (
    //     datas.find(
    //       ([{ name }, indice]) => name.toLowerCase() === dishName.toLowerCase()
    //     )
    //   ) {
    //     setMessage("Already Added");
    //     setShow(false);
    //   } else {
    //     history.push(`/vendor/add/${id}?dish=${dishName}`);
    //   }
    // }
  };
  return (
    <>
      <Header />
      <main className="py-3" style={{ background: "#ddd" }}>
        <Container>
        <Link to="/admin" className="btn btn-info my-3">
            Back
           </Link>
           <hr/>
           <br/>
          <Row>
            <Col md={8}>
              <h5>CUSTOMER LIST</h5>
            </Col>
            <Col md={4}>
              <Button
                variant="success"
                style={{ float: "right" }}
                onClick={() => setShow(true)}
              >
                ADD A CUSTOMER
              </Button>
            </Col>
          </Row>

          <br />
          <br />
          {message ? (
            show ? (
              <></>
            ) : (
              <Alert variant="warning">{message}</Alert>
            )
          ) : (
            <></>
          )}
          {show && (
            <Form onSubmit={SubmitCustomer} id="3e">
              <Row>
                <Col md={8}>
                  <Form.Control
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter Customer Name"
                  />
                </Col>
                <Col>
                  <Button type="submit" variant="info">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          <br />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>

              {loading?(<Loader/>):error?(<Alert variant="danger">{error}</Alert>):customers.map(({ name, phone, _id,email,address }) => {
                return (
                  <tr key={_id}>
                    {" "}
                    <td>{name}</td>
                    <td>{phone}</td>
                    <td>{address}</td>
                    <td>{email}</td>
                    <td>
                      <Link
                        to={`/admin/customer/update/${_id}`}
                        className="btn btn-primary"
                      >
                        Update
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/admin/customer/delete/${_id}?customer=${name}`}
                        className="btn btn-danger"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Customer;



// import React from 'react'
// import { Col, Container, ListGroup, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Footer from '../../components/Footer';
// import Header from '../../components/Header';

// const Customer = () => {
//     return (
//         <>
//         <Header/>
//         <main className="py-3">
//         <Container>
//         <Link to="/admin" className="btn btn-light my-3">Back</Link>
//         <h3>Customers List</h3>
    
//         <ListGroup variant="flush">
//             <ListGroup.Item variant="flush" >
//                     <Row>
//                       <Col md={4}>
//                        Customer Name
//                       </Col>
//                       <Col md={2}>Customer Id</Col>
//                       <Col md={2}>Accept</Col>
//                       <Col md={2}>
//                         Delete
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item variant="flush" >
//                     <Row>
//                       <Col md={4}>
//                        Customer Name
//                       </Col>
//                       <Col md={2}>Customer Id</Col>
//                       <Col md={2}>Accept</Col>
//                       <Col md={2}>
//                         Delete
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item variant="flush" >
//                     <Row>
//                       <Col md={4}>
//                        Customer Name
//                       </Col>
//                       <Col md={2}>Customer Id</Col>
//                       <Col md={2}>Accept</Col>
//                       <Col md={2}>
//                         Delete
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>    
//         </ListGroup>
//         </Container>
//         </main>
//         <Footer/>
//         </>
       
//     )
// }

// export default Customer
