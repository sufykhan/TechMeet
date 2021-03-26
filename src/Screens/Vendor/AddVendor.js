import React, { useEffect, useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import TotalWindow from "../../components/TotalWindow";
import { listProducts, updateProducts } from "../../redux/actions/productActions";

const UpdateDish = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
     }, [dispatch])
  
  const productList = useSelector((state) => state.productList);
  const {products}=productList
  const [updatePrice,setPrice]=useState();
  const history=useHistory()
  const {id}=useParams();
  const location=useLocation();
  const dish= location.search ? ((location.search.split("&")[0]).split("=")[1]) : "";

  

  const SubmitHandler = (e) => {
      e.preventDefault();
      const targetProduct=products.find((product)=>product.name.toLowerCase()===dish.toLowerCase())
      if(targetProduct){
        
        const newprice=[...targetProduct.price,updatePrice]
        const newvendor=[...targetProduct.vendors,id]
        const valueId=targetProduct._id;
        const target={...targetProduct,price:newprice,vendors:newvendor}
        dispatch(updateProducts(valueId,target))
        history.push(`/vendor/${id}`)
        }
      
    };

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
      <Card.Header>Add the {dish} to the Menu</Card.Header>
      <Card.Body>
        <Form onSubmit={SubmitHandler}>
          <Form.Group>
            <FormControl type="text" placeholder={dish} readOnly />
          </Form.Group>
          <Form.Group>
            <FormControl type="text" placeholder={id} readOnly />
          </Form.Group>
          <Form.Group>
            <FormControl
              type="number"
              placeholder="Price"
              value={updatePrice}
              onChange={(e) =>
                setPrice((e.target.value ))
              }
            />
          </Form.Group>
          <Button
            type="submit"
            variant="outline-primary"
            style={{ float: "right" }}
          >
            ADD
          </Button>
        </Form>
      </Card.Body>
    </Card>
    </TotalWindow>
  );
};

export default UpdateDish;