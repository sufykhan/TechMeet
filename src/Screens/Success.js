import React from 'react'
import { Alert, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CustomerHeader from '../components/CustomerHeader'

const Success = () => {
    return (
        <>
        <CustomerHeader/>
        <main className="py-3">
  
        <Container >
        <Alert variant="success">
Order Placed Successfully
        </Alert>
       <Alert variant="warning"><Link to="/customer">Go Back To Buy More</Link></Alert>
      </Container>
      </main>
      </>
    )
}

export default Success
