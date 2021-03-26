import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import TotalWindow from "../../../components/TotalWindow";
import {
  updateVendors,
  listVendors,
} from "../../../redux/actions/vendorActions";

const UpdateVendor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const vendorList = useSelector((state) => state.vendorList);
  const { loading, error, vendors } = vendorList;


  useEffect(() => {
    dispatch(listVendors());
    const filterVendor = vendors.find((vendor) => vendor._id === id);
    setVendorData(filterVendor)
  }, [dispatch]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(vendorData);
    dispatch(updateVendors(id,vendorData))
    history.push(`/admin/vendors`)
  };

  const [vendorData, setVendorData] = useState({
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
          <Card.Header>Update the Vendor: {vendorData.name}</Card.Header>
          <Card.Body>
            <Form onSubmit={SubmitHandler}>
              <Form.Group>
                <FormControl type="text" value={vendorData.name} readOnly />
              </Form.Group>
              <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Phone Number"
                  value={vendorData.phone}
                  onChange={(e) =>
                    setVendorData({ ...vendorData, phone: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Address"
                  value={vendorData.address}
                  onChange={(e) =>
                    setVendorData({ ...vendorData, address: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <FormControl
                  type="email"
                  placeholder="Email"
                  value={vendorData.email}
                  onChange={(e) =>
                    setVendorData({ ...vendorData, email: e.target.value })
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
