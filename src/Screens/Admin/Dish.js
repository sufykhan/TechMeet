import React from "react";
import { Col, Container,ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Dish = () => {
  return (
    <>
        <Header/>
        <main className="py-3">
          <Container>
      <Link to="/admin" className="btn btn-light my-3">
        Back
      </Link>
      <h3>Product List</h3>

      <div className="btn btn-light my-3">Add New Product</div>

      <ListGroup variant="flush">
        <ListGroup.Item variant="flush">
          <Row>
            <Col md={4}>Product</Col>
            <Col md={2}>Add</Col>
            <Col md={2}>Update</Col>
            <Col md={2}>Delete</Col>
            <Col md={2}></Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item variant="flush">
          <Row>
            <Col md={4}>Product Name</Col>
            <Col md={2}>Add</Col>
            <Col md={2}>Update</Col>
            <Col md={2}>Delete</Col>
            <Col md={2}></Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item variant="flush">
          <Row>
            <Col md={4}>Product Name</Col>
            <Col md={2}>Add</Col>
            <Col md={2}>Update</Col>
            <Col md={2}>Delete</Col>
            <Col md={2}></Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
      </Container>
      <Footer/>
      </main>
    </>
  );
};

export default Dish;
