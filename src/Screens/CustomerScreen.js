import React,{useEffect, useState} from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import CustomerHeader from "../components/CustomerHeader";
import DishItem from "./Customer/DishItem";
// import productData from "../productData"
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader"
import Message from "../components/Message"
import { listVendors } from "../redux/actions/vendorActions";

const CustomerScreen = () => {

  const dispatch = useDispatch()
  const productList= useSelector(state => state.productList)
  const {loading,error,products}=productList;

  const vendorList = useSelector((state) => state.vendorList);
  const { vendors} = vendorList;


  // console.log(products)
  useEffect(() => {
    dispatch(listVendors());
    dispatch(listProducts())
  }, [dispatch])

  const [searchItem,setItem]=useState("Select the Product")
  const [vendor,setVendor]=useState("Filter with Producers")
  
   const filterItem=()=>{
    const filterData=products.filter((product)=>(  product.name.toLowerCase().includes(searchItem.toLowerCase()) ||searchItem==="Select the Product" ))
     .filter((product)=>(product.vendors.find(e=>e===vendor) || vendor==="Filter with Producers"));
      // console.log(filterData)
    const data= filterData.map((product,index)=>{
      return (<DishItem product={product}/>)
    })
    return data;
   }

  return (
    <>
      <CustomerHeader />
      <main className="py-3" style={{background:"#ddd"}}>
      {loading ?(<Loader/>):error?(<Message va="danger" err={error}/>):
        <Container>
          <Row>
            <Col md={7}>
              {/* <Form.Control type="text" placeholder="Search Dishes" onChange={(e)=>setSearch(e.target.value)}/> */}
              <Form.Control as="select" value={searchItem} defaultValue="Choose..." onChange={(e)=>setItem(e.target.value)}>
                <option>Select the Product</option>
                {products.map((value,index)=><option key={index+1}>{value.name}</option>)}
              </Form.Control>
            </Col>
            {/* <Col md={2}>
              <div className="btn-info btn" onClick={()=>setItem(search)}>Search</div>
            </Col> */}
            <Col md={5}>
              <Form.Control as="select" value={vendor} defaultValue="Choose..." onChange={(e)=>setVendor(e.target.value)}>
                <option>Filter by Producers</option>
                {vendors.map((ven)=><option>{ven.name}</option>)}
              </Form.Control>
            </Col>
          </Row>
          <br />
          <Row>
           {filterItem()}
          </Row>
        </Container>
      }
      </main>
    </>
  );
};

export default CustomerScreen;
