import React, {  useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TotalWindow from "../../../components/TotalWindow";
import { createVendor } from "../../../redux/actions/vendorActions";


const AddVendor = () => {
    const dispatch = useDispatch()
  const history=useHistory()
  const {id}=useParams();
  const vendorName = id;


  const SubmitHandler = (e) => {
      e.preventDefault();
     //console.log(vendorData)
     dispatch(createVendor(vendorData))
     history.push(`/admin/vendors`)
      
    };

    const [vendorData, setVendorData] = useState({name:vendorName,phone:"",address:"",email:""})

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
      <Card.Header>Add the Vendor: {vendorData.name}</Card.Header>
      <Card.Body>
        
      <Form onSubmit={SubmitHandler}>
        <Form.Group><FormControl type="text" placeholder="Dish" value={vendorData.name} readOnly/></Form.Group>
            <Form.Group><FormControl type="text" placeholder="Phone Number" value={vendorData.phone} onChange={(e)=>setVendorData({...vendorData,phone:e.target.value})}/></Form.Group>
            <Form.Group><FormControl type="text" placeholder="Address" value={vendorData.address} onChange={(e)=>setVendorData({...vendorData,address:e.target.value})}/></Form.Group>   
            <Form.Group><FormControl type="email" placeholder="Email" value={vendorData.email} onChange={(e)=>setVendorData({...vendorData,email:e.target.value})}/></Form.Group>  
            <Button type="submit" variant="outline-primary" style={{float:"right"}} >Submit</Button>
        </Form>

      </Card.Body>
    </Card>
    </TotalWindow>
  );
};

export default AddVendor;