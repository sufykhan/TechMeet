import React from "react";
import { Alert, Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import TotalWindow from "../../../components/TotalWindow";
import { deleteCustomer} from "../../../redux/actions/customerActions";

const DeleteVendor = () => {
    const dispatch = useDispatch()
  
  
  const history=useHistory()
  const {id}=useParams();
  const location=useLocation();
  const customer = location.search ? ((location.search.split("&")[0]).split("=")[1]) : "";
  
   
  
  
  const SubmitHandler = (e) => {
    // console.log(id)
           
          dispatch(deleteCustomer(id))
          history.push(`/admin/customers`)
             
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
      <Card.Header>Remove the {customer} </Card.Header>
      <Card.Body>
        <Form onSubmit={SubmitHandler}>
          <Form.Group>
            <FormControl type="text" placeholder={customer} readOnly />
          </Form.Group>
          <Form.Group>
           <Alert variant="warning">Are you sure you want to Remove</Alert>
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

export default DeleteVendor;