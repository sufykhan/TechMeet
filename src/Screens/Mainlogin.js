import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Col,
  Container,
  Alert,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import FormContainer from "../components/FormContainer";
import Header from "../components/Header";
import { listCustomers } from "../redux/actions/customerActions";
import { listVendors } from "../redux/actions/vendorActions";

const Mainlogin = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const vendorList = useSelector((state) => state.vendorList);
  const { vendors} = vendorList;

  const customerList = useSelector((state) => state.customerList);
  const {customers,loading} = customerList;

  useEffect(() => {
    dispatch(listVendors());
    dispatch(listCustomers());
  }, [dispatch]);

  const [aname, setaName] = useState("");
  const [apassword, setaPassword] = useState("");
  const [cname, setcName] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitDel=(e)=>{
   history.push("/delivery")
  }
  const submitAdmin = (e) => {
    if(!loading){
    const foundVendor=vendors.find(vendor=>vendor.name.toLowerCase()===aname.toLowerCase())
    if (aname === "Admin" && apassword === "123") {
      history.push("/admin");
    } else if (foundVendor&& apassword === "123") {
      history.push(`/vendor/${foundVendor.name}`);
    }
     else {
      setMessage("Invalid Credentials for Admin");
      e.preventDefault();
    }
  }
  else{
    e.preventDefault()
  }
  };
  const submitCustomer = (e) => {
    if(!loading){
    const foundCustomer=customers.find(customer=>customer.name.toLowerCase()===cname.toLowerCase())
    localStorage.setItem("customerLogined",JSON.stringify({id:foundCustomer._id,name:foundCustomer.name}))
    if (foundCustomer && cpassword === "123") {
      history.push("/customer");
    } else {
      setMessage("Invalid Credentials for Customer");
      e.preventDefault();
    }
  }
  else{
    e.preventDefault()
  }
  };
  return (
    <>
      <Header />
      <main className="py-3" style={{ background: "#ddd" }}>
        <Container>
        {/* <img src={item} alt="background form" style={{ opacity: "0.5",width:"100%"}} /> */}
       
            {message === "" ? <></> : <Alert variant="danger">{message}</Alert>}

            <FormContainer>
              <Col xs={12} md={6}>
                <Tabs
                  defaultActiveKey="Admin"
                  id="uncontrolled-tab-example"
                  style={{ fontSize: "22px" }}
                >
                  <Tab eventKey="Admin" title="ADMIN">
                    {/* <h1>Admin / Vendor</h1> */}
                    <Form onSubmit={submitAdmin} style={{ color: "black" }}>
                      <br />
                      <Form.Group controlId="AdminName">
                        <Form.Label>Admin User Name</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Enter User Name"
                          value={aname}
                          onChange={(e) => {
                            setaName(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="Apassword">
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                          type="password"
                          required
                          placeholder="Enter password"
                          value={apassword}
                          onChange={(e) => {
                            setaPassword(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit">Sign In</Button>
                    </Form>
                  </Tab>
              
                  <Tab eventKey="Delivery" title="DELIVERY">
                    <Form onSubmit={submitDel} style={{ color: "black" }}>
                      <Form.Group controlId="DeliverName">
                        <br />
                        <Form.Label>Delivery</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Enter User Name"
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="Xpassword">
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                          type="password"
                          required
                          placeholder="Enter password"
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" >Sign In</Button>
                    </Form>
                  </Tab>

                  <Tab eventKey="Vendors" title="PRODUCER">
                    <Form onSubmit={submitAdmin} style={{ color: "black" }}>
                      <Form.Group controlId="VendorName">
                        <br />
                        <Form.Label>Producer Name</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Enter User Name"
                          value={aname}
                          onChange={(e) => {
                            setaName(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="AApassword">
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                          type="password"
                          required
                          placeholder="Enter password"
                          value={apassword}
                          onChange={(e) => {
                            setaPassword(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit">Sign In</Button>
                    </Form>
                  </Tab>


                </Tabs>
              </Col>
              <Col xs={12} md={6} style={{marginBottom:"25px"}}>
              
                <h3 className="my-3">Customer</h3>
                <Form onSubmit={submitCustomer} style={{ color: "black" }}>
                  <Form.Group controlId="CustomerName">
                    <Form.Label>Customer User Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter User Name"
                      value={cname}
                      onChange={(e) => {
                        setcName(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="Cpassword">
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter password"
                      value={cpassword}
                      onChange={(e) => {
                        setcPassword(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit">Sign In</Button>
                </Form>
              </Col>
            </FormContainer>
      
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Mainlogin;
