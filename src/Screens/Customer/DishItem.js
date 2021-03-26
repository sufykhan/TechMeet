import React, {useState } from "react";
import { Button, Card, Col, FormControl, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import Img from "../../images/cury.jpg"
const DishItem = ({ product }) => {

  const { name, vendors, image, price,_id } = product;
  const [index, setIndex] = useState(0);
  const [display,setDisplay]=useState(false);

  // const vendorList = useSelector(state => state.vendorList)
  
  const [qty,setQty]=useState(1);


  
  const history = useHistory();
  let countInStock = 5;

  const addToCartHandler=()=>{
    history.push(`/cart/${_id}?qty=${qty}&selectedvendor=${vendors[index]}&pri=${price[index]}`)
  }

  const vendorData=JSON.parse(localStorage.getItem("vendorData"));
  const customerData=JSON.parse(localStorage.getItem("customerData"));

  const detail = () => {
    const y=vendors.map((value,index)=><tr><td>{index+1}</td><td>{value}</td><td>Rs{price[index]}</td><td>{(vendorData.find(({address,name})=>name===value)).address}</td></tr>)
    const x = (
      <Table className="cursor" variant="dark" striped bordered hover responsive onClick={()=>setDisplay(false)}>
        <thead>
          <tr>
            <th></th>
            <th>Producer</th>
            <th>Price</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {y}
        </tbody>
      </Table>
    );
    return x;
  };
  return (
    <Col md={4} xs={12} sm={6} className="mb-3" key={_id}>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card.Title as="h5">{name}</Card.Title>
              {/* <Card.Subtitle as="h6" muted>
                {calories}
              </Card.Subtitle> */}
            </Col>
            <Col md={4}>
              <Card.Text style={{ float: "right" }}>
                Rs {price[index]}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
        {display? detail():<Card.Img className="cursor" src={image} onClick={()=>setDisplay(true)}/>}
        <FormControl
          as="select"
          variant="flush"
          className="mr-sm-2"
          id="inlineFormCustomSelect"
          onChange={(e) =>
            setIndex(
              vendors.findIndex((v) => v === e.target.value)
                ? vendors.findIndex((v) => v === e.target.value)
                : 0
            )
          }
        >
          <option>Select the Producer</option>
          {vendors.map((vendor, index) => (
            <option>{vendor}</option>
          ))}
        </FormControl>
        <br />
        <FormControl
          as="select"
          variant="flush"
          className="mr-sm-2"
          id="inlineFormCustomSelect"
          onChange={(e)=>setQty(e.target.value)}
        >
          {Array.from(Array(countInStock).keys()).map((val) => {
            return (
              <option key={val + 1} value={val + 1}>
                {val + 1}
              </option>
            );
          })}
        </FormControl>
        <Button onClick={addToCartHandler}>Add to Cart</Button>
      </Card>
    </Col>
  );
};

export default DishItem;
