import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import TotalWindow from "../../../components/TotalWindow";
import {
  updateCustomers,
  listCustomers,
} from "../../../redux/actions/customerActions";

const UpdateVendor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers } = customerList;


  useEffect(() => {
    dispatch(listCustomers());
    const filterCustomer = customers.find((customer) => customer._id === id);
    setCustomerData(filterCustomer)
  }, [dispatch]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    //console.log(vendorData);
    dispatch(updateCustomers(id,customerData))
    history.push(`/admin/customers`)
  };

  const [customerData, setCustomerData] = useState({
    name: "",
    phone:"",
    address: "",
    email: "",
  });

  return (
    <TotalWindow>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card
          style={{
            position: "absolute",
            top: "25%",
            right: "25%",
            boxShadow: "2px 8px 10px #ddd",
            width: "50%",
          }}
        >
          <Card.Header>Update the Customer: {customerData.name}</Card.Header>
          <Card.Body>
            <Form onSubmit={SubmitHandler}>
              <Form.Group>
                <FormControl type="text" value={customerData.name} readOnly />
              </Form.Group>
              <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Phone Number"
                  value={customerData.phone}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, phone: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Address"
                  value={customerData.address}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, address: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <FormControl
                  type="email"
                  placeholder="Email"
                  value={customerData.email}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                type="submit"
                variant="outline-primary"
                style={{ float: "right" }}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </TotalWindow>
  );
};

export default UpdateVendor;
