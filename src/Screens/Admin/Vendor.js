import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { listVendors } from "../../redux/actions/vendorActions";

const Vendor = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const vendorList = useSelector((state) => state.vendorList);
  const { loading, error, vendors } = vendorList;
  
  
  useEffect(() => {
    dispatch(listVendors());
  }, [dispatch]);


  const [show, setShow] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [message, setMessage] = useState();

  const SubmitVendor = (e) => {
    e.preventDefault();
    if(vendors.find((vendor)=>vendor.name.toLowerCase()===vendorName.toLowerCase())){
      setMessage("Vendor Already Exists")
      setShow(false)
    }
    else{
    history.push(`/admin/vendor/add/${vendorName}`)
    }
    //console.log(dishName)
    // const d = vendors.find(
    //   ({ name }) => name.toLowerCase() === vendorName.toLowerCase()
    // );
    // if (!d) {
    //   history.push(`/vendor/new/${id}?vendor=${vendorName}`);
    // } else {
    //   if (
    //     datas.find(
    //       ([{ name }, indice]) => name.toLowerCase() === dishName.toLowerCase()
    //     )
    //   ) {
    //     setMessage("Already Added");
    //     setShow(false);
    //   } else {
    //     history.push(`/vendor/add/${id}?dish=${dishName}`);
    //   }
    // }
  };
  return (
    <>
      <Header />
      <main className="py-3" style={{ background: "#c6e7dc" }}>
        <Container>
        <Link to="/admin" className="btn btn-info my-3">
            Back
           </Link>
           <hr/>
           <br/>
          <Row>
            <Col md={8}>
              <h5>PRODUCER LIST</h5>
            </Col>
            <Col md={4}>
              <Button
                variant="success"
                style={{ float: "right" }}
                onClick={() => setShow(true)}
              >
                ADD A PRODUCER
              </Button>
            </Col>
          </Row>

          <br />
          <br />
          {message ? (
            show ? (
              <></>
            ) : (
              <Alert variant="warning">{message}</Alert>
            )
          ) : (
            <></>
          )}
          {show && (
            <Form onSubmit={SubmitVendor}>
              <Row>
                <Col md={8}>
                  <Form.Control
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="Enter Vendor Name"
                  />
                </Col>
                <Col>
                  <Button type="submit" variant="info">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          <br />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producer Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>

              {loading?(<Loader/>):error?(<Alert variant="danger">{error}</Alert>):vendors.map(({ name, phone, _id,email,address }) => {
                return (
                  <tr key={_id}>
                    {" "}
                    <td>{name}</td>
                    <td>{phone}</td>
                    <td>{address}</td>
                    <td>{email}</td>
                    <td>
                      <Link
                        to={`/admin/vendor/update/${_id}`}
                        className="btn btn-primary"
                      >
                        Update
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/admin/vendor/delete/${_id}?vendor=${name}`}
                        className="btn btn-danger"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Vendor;