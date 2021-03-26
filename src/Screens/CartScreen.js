import React, { useEffect} from "react";
import {Alert, Col, ListGroup, Row, Image,  Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import CustomerHeader from "../components/CustomerHeader";
import { cartActions, createOrder, removeFromCart } from "../redux/actions/cartActions";
// import img from "../images/cury.jpg"
// import im from "../svg/cart.svg"
const CartScreen = () => {
  let {id} = useParams();
  let location = useLocation();
  const history=useHistory();
 
  // const [orderMessage,setOrderMessage]=useState(false)

  const qty = location.search ? Number((location.search.split("&")[0]).split("=")[1]) : 1;
  const selectedvendor = location.search ? ((location.search.split("&")[1]).split("=")[1]) : "";
  const pri = location.search ? ((location.search.split("&")[2]).split("=")[1]) : 1;
 
  const userLoginValue=JSON.parse(localStorage.getItem("customerLogined"))

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  //console.log(order);

  useEffect(() => {
    if (id) {
      console.log("Dispatch cartaction working")
      dispatch(cartActions(id, qty,selectedvendor,pri));
    }
  }, [dispatch, id, qty,selectedvendor,pri]);
   
  const removeFromCartHandler=(id,selectedvendor)=>{
       dispatch(removeFromCart(id,selectedvendor))
   }

   const checkoutHandler=()=>{
     
     if(userLoginValue)
     {
       const order={cartItems:cartItems,customer:userLoginValue}
      dispatch(createOrder(order))
      history.push("/success")
     }
     else{
       history.push("/")
     }
}

  return (
      <>
      <CustomerHeader/>
      <main className="py-3">

      <Container >
      <div>
      {/* <img src={im} style={{opacity:"0.5"}}/> */}
      {/* {orderMessage?<Alert variant="Success">Order Placed Successfully</Alert>:<></>} */}
    <Row >
      <Col md={8}>
        <h2>ORDER LIST</h2>
        {cartItems.length=== 0 ? (
          <Alert variant="info">
            Your cart is empty <Link to="/customer">Go Back</Link>
          </Alert>
        ) : (
          <ListGroup>
               {cartItems.map(({calories,image,name,pri,product,qty,selectedvendor})=>
               <ListGroup.Item variant="flush" key={product}>
                    <Row style={{alignItems:"center"}}>
                      <Col md={2}>
                        <Image src={image} fluid rounded />
                      </Col>
                      <Col md={2}><Link to={`/`}>{name}</Link></Col>
                      <Col md={2}>Rs {pri}</Col>
                      <Col md={2}>
                      Quantity:{qty}
                        {/* <FormControl as="select" value={2} variant="flush" >
                          {Array.from(Array(5).keys()).map((val) => {
                            return (
                              <option key={val + 1} value={val + 1}>
                                {val + 1}
                              </option>
                            );
                          })}
                        </FormControl> */}
                      </Col>
                      <Col md={2}>{selectedvendor}</Col>
                      <Col md={2}>
                        <Button type="button" variant="light" onClick={removeFromCartHandler}><i className="fas fa-trash"></i></Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>

               )}
                  
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
      <Card variant="flush">
          <ListGroup>
              <ListGroup.Item >
                  <h4>Subtotal {cartItems.reduce((acc,item)=>acc+item.qty,0)} Item</h4>
                  <h4>Total Money: {(cartItems.reduce((acc,item)=>acc+Number(item.qty)* Number(item.pri),0)).toFixed(2)}</h4>
              </ListGroup.Item>
              <ListGroup.Item >
                  <Button type="button" className="btn-block" disabled={cartItems.length===0} onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
              </ListGroup.Item>
          </ListGroup>
      </Card>
      </Col>
      
    </Row>
    </div>
    </Container>
    </main>
    </>
  );
};

export default CartScreen;