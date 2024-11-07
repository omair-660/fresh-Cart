import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function Contact() {
  return (
   <>
 <section>
 <Container className="my-5">
      <Row>
     
        <Col md={4}>
          <Card className="p-4 mb-3">
            <div className="d-flex align-items-center mb-3">
            <i className="fas fa-phone-alt me-2 text-danger"></i>
              <h5>Call To Us</h5>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
            <hr />
            <div className="d-flex align-items-center mb-3">
            <i className="fas fa-envelope me-2 text-danger"></i>
              <h5>Write To Us</h5>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="p-4">
            <Form>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group className='mb-3 mb-md-0' controlId="name">
                    <Form.Control type="text" placeholder="Your Name *" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className='mb-3 mb-md-0' controlId="email">
                    <Form.Control type="email" placeholder="Your Email *" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className='mb-3 mb-md-0' controlId="phone">
                    <Form.Control type="text" placeholder="Your Phone *" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="message" className="mb-3">
                <Form.Control as="textarea" rows={4} placeholder="Your Message" />
              </Form.Group>
              <Button variant="danger" type="submit">
                Send Message
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
 </section>

   </>
  )
}
