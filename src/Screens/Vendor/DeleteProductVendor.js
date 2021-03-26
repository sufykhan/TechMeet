import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import TotalWindow from "../../components/TotalWindow";
import { listProducts, updateProducts,deleteProduct} from "../../redux/actions/productActions";

const DeleteDish = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
     }, [dispatch])
  
  const productList = useSelector((state) => state.productList);
  const {products}=productList
  
  const history=useHistory()
  const {id}=useParams();
  const location=useLocation();
  const valueId = location.search ? ((location.search.split("&")[0]).split("=")[1]) : "";
  const  indice= location.search ? Number((location.search.split("&")[1]).split("=")[1]) : 0;
  const dish = location.search ? ((location.search.split("&")[2]).split("=")[1]) : "";

  
  
  const SubmitHandler = (e) => {
      e.preventDefault();
      const targetProduct=products.find((product)=>product._id===valueId)
      if(targetProduct && targetProduct.vendors.length>1){

        const check=targetProduct.vendors[indice];
        const newUpdate=targetProduct.vendors.filter((vendor)=>vendor!==check)
        const target={...targetProduct,vendors:newUpdate,price:targetProduct.price.filter((pri)=>pri!==targetProduct.price[indice])}
        dispatch(updateProducts(valueId,target))
        history.push(`/vendor/${id}`)
        }
      else if (targetProduct.vendors.length===1)
      {
          dispatch(deleteProduct(valueId))
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
      <Card.Header>Remove the {dish} </Card.Header>
      <Card.Body>
        <Form onSubmit={SubmitHandler}>
          <Form.Group>
            <FormControl type="text" placeholder={dish} readOnly />
          </Form.Group>
          <Form.Group>
           <Alert variant="warning">Are you sure you want to Delete</Alert>
          </Form.Group>
          <div style={{ textAlign:"center" }}>
          <Button
            type="submit"
            variant="outline-danger"
            
          >
            Remove
          </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </TotalWindow>
  );
};

export default DeleteDish;