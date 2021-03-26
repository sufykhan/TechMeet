import React from "react";
import { Navbar,Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
const {pathname}=useLocation();
const comp=pathname.split('/')[1];
//console.log(comp)
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">Deal Pakki</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
          {comp=="vendor" &&  <Nav className="ml-auto">
              <LinkContainer to="/learning">
                <Nav.Link>
                  <i style={{fontSize:"23px"}} className="fab fa-leanpub"></i>
                </Nav.Link>
              </LinkContainer>
             
            </Nav>}
      
    
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
