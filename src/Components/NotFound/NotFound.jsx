import React from 'react'
import {  Col, Container, Row } from 'react-bootstrap'
import not from '../../assets/not.png'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
   <>
   <section className='notFound'>
   <Container className="text-center vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col className='bg-white bg-opacity-10 rounded-3 blur p-3 shadow-lg'>
          <h1 style={{ fontSize: '5rem', color: '#dc3545' }}>404</h1>
          <h2 className='text-white blur bg-black bg-opacity-25 p-2 rounded-3'>Oops! This page seems to have taken a wrong turn.</h2>
          <img
            src={not} 
            alt="Not Found"
            className="img-fluid mb-4"
            style={{ maxWidth: '300px' }}
          />
          <p className='text-white blur bg-black bg-opacity-25 p-2 rounded-3'>Looks like you've stumbled into a black hole!</p>
          <Link to="/" className="btn btn-primary mt-3">
                Take me Home!
              </Link>
        </Col>
      </Row>
    </Container>
   </section>
   </>
  )
}
