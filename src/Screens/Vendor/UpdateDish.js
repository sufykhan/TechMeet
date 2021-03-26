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
  const valueId = location.search ? ((location.search.split("&")[0]).split("=")[1]) : "";
  const  indice= location.search ? Number((location.search.split("&")[1]).split("=")[1]) : 0;
  const dish = location.search ? ((location.search.split("&")[2]).split("=")[1]) : "";

  
  
  
  //const target={...targetProduct,vendors:check}
  //console.log(target)
  const SubmitHandler = (e) => {
      e.preventDefault();
      const targetProduct=products.find((product)=>product._id===valueId)
      if(targetProduct){
        const newprice=targetProduct.price
        newprice[Number(indice)]=String(updatePrice)
        const target={...targetProduct,price:newprice}
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
      <Card.Header>Update the {dish} Price</Card.Header>
      <Card.Body>
        <Form onSubmit={SubmitHandler}>
          <Form.Group>
            <FormControl type="text" placeholder={dish} readOnly />
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
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
    </TotalWindow>
  );
};

export default UpdateDish;

//Delete handler

// const targetProduct=products.find((product)=>product._id===valueId)
//   console.log(targetProduct)
//   if(targetProduct){
//   const check=targetProduct.vendors[indice];
//   const newUpdate=targetProduct.vendors.filter((vendor)=>vendor!==check)
//   const target={...targetProduct,vendors:newUpdate,price:targetProduct.price.filter((pri)=>pri!==targetProduct.price[indice])}
//   console.log(target)
//   }