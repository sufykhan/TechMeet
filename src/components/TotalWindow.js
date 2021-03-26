import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'

const TotalWindow = ({children}) => {
    return (
        <>
        <Header/>
        <main className="py-3" style={{background:"#c6e7dc"}}>
          <Container>

            {children}
            </Container>
            </main>
            <Footer/>
        </>
    )
}

export default TotalWindow
