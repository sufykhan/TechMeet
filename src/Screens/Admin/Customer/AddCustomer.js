import React, {  useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TotalWindow from "../../../components/TotalWindow";
import { createCustomer } from "../../../redux/actions/customerActions";


const AddCustomer = () => {
    const dispatch = useDispatch()
  const history=useHistory()
  const {id}=useParams();
  const customerName = id;


  const SubmitHandler = (e) => {
      e.preventDefault();
     //console.log(customerData)
     dispatch(createCustomer(customerData))
     history.push(`/admin/customers`)
      
    };

    const [customerData, setCustomerData] = useState({name:customerName,phone:"",address:"",email:""})

  return (
      <TotalWindow>
    <Card
      style={{
        position: "absolute",
        top: "25%",
        right:"25%",
        boxShadow: "2px 8px 10px #ddd",
        width:"50%"
      }}
    >
      <Card.Header>Add the Vustomer: {customerData.name}</Card.Header>
      <Card.Body>
        
      <Form onSubmit={SubmitHandler}>
        <Form.Group><FormControl type="text" placeholder="Dish" value={customerData.name} readOnly/></Form.Group>
            <Form.Group><FormControl type="text" placeholder="Phone Number" value={customerData.phone} onChange={(e)=>setCustomerData({...customerData,phone:e.target.value})}/></Form.Group>
            <Form.Group><FormControl type="text" placeholder="Address" value={customerData.address} onChange={(e)=>setCustomerData({...customerData,address:e.target.value})}/></Form.Group>   
            <Form.Group><FormControl type="email" placeholder="Email" value={customerData.email} onChange={(e)=>setCustomerData({...customerData,email:e.target.value})}/></Form.Group>  
            <Button type="submit" variant="outline-primary" style={{float:"right"}} >Submit</Button>
        </Form>

      </Card.Body>
    </Card>
    </TotalWindow>
  );
};

export default AddCustomer;