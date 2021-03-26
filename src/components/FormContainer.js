import React from "react";
import { Container, Row } from "react-bootstrap";
const FormContainer = ({ children }) => {
  return (
    <Container style={{position:"absolute",top:"40%"}}>
      <Row className="justify-content-md-center m-auto ">
          {children}
      </Row>
    </Container>
  );
};

export default FormContainer;
