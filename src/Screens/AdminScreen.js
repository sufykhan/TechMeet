import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AdminScreen = () => {
    return (
        <>
        <Header/>
        <main className="py-3" style={{background:"#ddd"}}>
          <Container>
          <Link to="/" className="btn btn-info">Back</Link>
          <br/>
          <hr/>
          <br/>
        <h2>Manage</h2>
        <br/>
        <ListGroup>
            <ListGroup.Item variant="flush" ><Link to="/admin/customers"><h5>Customers</h5></Link></ListGroup.Item>
            <ListGroup.Item variant="flush" ><Link to="/admin/vendors"><h5>Producers</h5></Link></ListGroup.Item>
            <ListGroup.Item variant="flush" ><Link to="/admin/orders"><h5>Orders</h5></Link></ListGroup.Item>
        </ListGroup>
        </Container>
        </main>
        <Footer/>
        </>
        
    )
}

export default AdminScreen
