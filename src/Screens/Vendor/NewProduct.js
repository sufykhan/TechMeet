import React, { useEffect, useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import TotalWindow from "../../components/TotalWindow";
import { createProduct } from "../../redux/actions/productActions";

import FileBase from "react-file-base64"

const Dish = () => {
    const dispatch = useDispatch()
  const history=useHistory()
  const {id}=useParams();
  const location=useLocation();
  const dishName = location.search ? ((location.search.split("&")[0]).split("=")[1]) : "";


  const SubmitHandler = (e) => {
      e.preventDefault();
     console.log(postData)
     dispatch(createProduct(postData))
     history.push(`/vendor/${id}`)
      
    };

    const [postData, setPostData] = useState({name:dishName,calories:"",image:"",price:[],vendors:[id]})

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
      <Card.Header>Create the {postData.name}</Card.Header>
      <Card.Body>
        
      <Form onSubmit={SubmitHandler}>
        <Form.Group><FormControl type="text" placeholder="Dish" value={postData.name} readOnly/></Form.Group>
            {/* <Form.Group><FormControl type="text" placeholder="Calories" value={postData.calories} onChange={(e)=>setPostData({...postData,calories:e.target.value})}/></Form.Group> */}
            <Form.Group><FormControl type="text" placeholder="Vendor" value={postData.vendors[0]} readOnly/></Form.Group>   
            <Form.Group><FormControl type="text" placeholder="Price" value={postData.price} onChange={(e)=>setPostData({...postData,price:[e.target.value]})}/></Form.Group>
            <Form.Group>
           <FileBase  type="file" multiple={false} onDone={({base64})=>setPostData({...postData,image:base64})}/>
            </Form.Group>     
            <Button type="submit" variant="outline-primary" style={{float:"right"}} >Submit</Button>
        </Form>

      </Card.Body>
    </Card>
    </TotalWindow>
  );
};

export default Dish;
