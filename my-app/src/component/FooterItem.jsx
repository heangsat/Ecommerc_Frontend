import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin, Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';

function FooterItem() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <Container>
        <Row>
          {/* Column 1: About */}
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase mb-3">ShopMaster</h5>
            <p className="text-white-50">
              Your one-stop destination for premium electronics, fashion, and lifestyle products. We deliver quality and trust.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><Facebook size={20} /></a>
              <a href="#" className="text-white"><Twitter size={20} /></a>
              <a href="#" className="text-white"><Instagram size={20} /></a>
              <a href="#" className="text-white"><Linkedin size={20} /></a>
            </div>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Home</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">New Arrivals</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Best Sellers</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Flash Sales</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Contact Us</a></li>
            </ul>
          </Col>

          {/* Column 3: Customer Care */}
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase mb-3">Customer Care</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">My Account</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Track Order</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Shipping & Returns</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">FAQ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Privacy Policy</a></li>
            </ul>
          </Col>

          {/* Column 4: Newsletter */}
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase mb-3">Newsletter</h5>
            <p className="text-white-50 small">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <Form>
              <Form.Group className="mb-2">
                <Form.Control type="email" placeholder="Your email address" />
              </Form.Group>
              <Button variant="primary" className="w-100">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr className="bg-white-50 my-4" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-white-50 small">
              &copy; {new Date().getFullYear()} ShopMaster. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
             <div className="d-flex justify-content-center justify-content-md-end gap-3 text-white-50 small">
                <div className="d-flex align-items-center gap-2">
                   <Telephone /> <span>+1 (555) 123-4567</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                   <Envelope /> <span>support@shopmaster.com</span>
                </div>
             </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterItem;
