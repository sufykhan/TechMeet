import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { listProducts } from "../../redux/actions/productActions";

const VendorDynamic = () => {
  let { id } = useParams();
  const history=useHistory()
const dispatch = useDispatch()
const productList = useSelector(state => state.productList)
const {loading,error,products}=productList;
const [datas,setDatas]=useState([])
useEffect(() => {
   dispatch(listProducts())
}, [dispatch])

const listByVendor=()=>{
    let arr=[];
    //const filtered=products.filter(({vendors})=>vendors.find((vendor)=>vendor==={id}))
    if(products){
    for(let i=0;i<products.length;i++){
      for(let j=0;j<products[i].vendors.length;j++)
      {
        if(products[i].vendors[j]===id){
            arr.push([products[i],j])
        }
      }
    }
  }
    return arr;
    // const lists=arr.map(([{name,price},indice],index)=>{
    //     <tr>
    //             <td>{index+1}</td>
    //             <td>{name}</td>
    //             <td>{price[indice]}</td>
    //             <td><Link to={`/vendor/${id}?index=${indice}&todo=update`} className="btn btn-light">Update</Link></td>
    //             <td><Link to={`/vendor/${id}?index=${indice}&todo=delete`} className="btn btn-light">Delete</Link></td>
    //     </tr>        
    // })
    // return lists
    
}
useEffect(() => {
    const values=(listByVendor())
    if(values.length>0){
    setDatas(values)
    }
}, [products])


const [show,setShow]=useState(false)
const [dishName,setDishName]=useState("");
const [message,setMessage]=useState();

const SubmitDish=(e)=>{
  e.preventDefault()
  //console.log(dishName)
  const d=products.find(({name})=>(name.toLowerCase()===dishName.toLowerCase()))
  if(!d)
  {
    history.push(`/vendor/new/${id}?dish=${dishName}`)
  }
  else{
    if(datas.find(([{name},indice])=>name.toLowerCase()===dishName.toLowerCase())){
     setMessage("Already Added");
     setShow(false)
    }
    else{
      history.push(`/vendor/add/${id}?dish=${dishName}`)
    }
  }
 
}
  return (
    <>
      <Header />
      <main className="py-3" style={{ background:"#ddd"}}>
        <Container>
        <Row><Col md={8} ><h5> PRODUCT LIST</h5></Col><Col md={4} ><Button variant="success" style={{float:"right"}} onClick={()=>setShow(true)}>ADD A PRODUCT</Button></Col></Row>
        
        <br/>
        <br/>
        {(message)?(show?<></>:<Alert variant="warning">{message}</Alert>):<></>}
        {show && <Form onSubmit={SubmitDish}><Row><Col md={8}><Form.Control onChange={(e)=>setDishName(e.target.value)} placeholder="Enter Dish Name" /></Col><Col><Button type="submit" variant="info">Submit</Button></Col></Row></Form>}
       <br/>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>{id}</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* here will be the vendoe data after checkput */}
              {/* {datas.map(([{name,price},indice],index)=>{
        <tr>
                <td>{index+1}</td>
                <td>{name}</td>
                <td>{price[indice]}</td>
                <td><Link to={`/vendor/${id}?index=${indice}&todo=update`} className="btn btn-light">Update</Link></td>
                <td><Link to={`/vendor/${id}?index=${indice}&todo=delete`} className="btn btn-light">Delete</Link></td>
        </tr>        
    })} */}
    {!loading?datas.map(([{name,price,_id},value],index)=>{return (<tr> <td>{index+1}</td>
                <td>{name}</td>
                <td>Rs {price[value]}</td>
                <td><Link to={`/vendor/update/${id}?id=${_id}&index=${value}&dish=${name}`} className="btn btn-primary">Update</Link></td>
                <td><Link to={`/vendor/delete/${id}?id=${_id}&index=${value}&dish=${name}`} className="btn btn-danger">Delete</Link></td></tr>)}):<Loader/>}
            </tbody>
          </Table>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default VendorDynamic;
