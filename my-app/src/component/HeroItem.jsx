import React from 'react';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import herolaptop from '../assets/hero-laptop.jpg';

function HeroItem() {
  return (
    <div className="bg-light">
      <Carousel interval={3000} pause="hover">
        {/* Slide 1 */}
        <Carousel.Item style={{ height: '500px' }}>
          <div 
            className="d-block w-100 h-100"
            style={{ 
              backgroundColor: '#f8f9fa',
              backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
            }}
          >
            <Container className="h-100">
              <Row className="h-100 align-items-center">
                <Col md={6} className="text-start">
                  <span className="badge bg-danger mb-2">New Arrival</span>
                  <h1 className="display-4 fw-bold text-dark">Next Gen Gaming</h1>
                  <p className="lead text-secondary mb-4">Experience console-quality gaming on the go with our latest handheld devices.</p>
                  <Button variant="primary" size="lg" className="px-4 me-2">Shop Now</Button>
                  <Button variant="outline-dark" size="lg" className="px-4">View Specs</Button>
                </Col>
                <Col md={6} className="text-center">
                  <img
                    className="img-fluid"
                    src={herolaptop}
                    alt="Gaming Console"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item style={{ height: '500px' }}>
          <div 
            className="d-block w-100 h-100"
            style={{ 
              backgroundColor: '#e0c3fc',
              backgroundImage: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' 
            }}
          >
            <Container className="h-100">
              <Row className="h-100 align-items-center">
                <Col md={6} className="text-start order-md-2">
                  <span className="badge bg-primary mb-2">Best Seller</span>
                  <h1 className="display-4 fw-bold text-dark">Studio Quality Sound</h1>
                  <p className="lead text-dark mb-4">Immerse yourself in music with our premium noise-cancelling headphones.</p>
                  <Button variant="dark" size="lg" className="px-4 me-2">Buy Now</Button>
                </Col>
                <Col md={6} className="text-center order-md-1">
                  <img
                    className="img-fluid"
                    src={herolaptop}
                    alt="Headphones"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item style={{ height: '500px' }}>
           <div 
            className="d-block w-100 h-100"
            style={{ 
              backgroundColor: '#fa709a',
              backgroundImage: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)' 
            }}
          >
            <Container className="h-100">
              <Row className="h-100 align-items-center">
                <Col md={6} className="text-start">
                  <span className="badge bg-warning text-dark mb-2">Limited Time</span>
                  <h1 className="display-4 fw-bold text-dark">Summer Collection</h1>
                  <p className="lead text-dark mb-4">Upgrade your wardrobe with the hottest styles of the season.</p>
                  <Button variant="light" size="lg" className="px-4 text-primary fw-bold">Explore</Button>
                </Col>
                <Col md={6} className="text-center">
                  <img
                    className="img-fluid"
                    src={herolaptop}
                    alt="Fashion"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroItem;
