import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, Button, InputGroup, Badge, NavDropdown } from "react-bootstrap";
import { Search, Cart3, PersonCircle, Heart } from 'react-bootstrap-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import imageLogo from "../assets/logo.jpg";
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

function NavbarItem() {
  const { getCartCount, toggleCart } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Sync local state with URL param
  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchTerm(query);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
    <Navbar expand="lg" className="navbar-custom sticky-top py-3">
      <Container>
        {/* 1. Brand / Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center me-lg-5">
          <img
            src={imageLogo}
            alt="ShopMaster Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2 rounded-circle shadow-sm"
          />
          <div className="d-flex flex-column" style={{ lineHeight: '1.1' }}>
             <span className="text-dark fw-bold" style={{ fontSize: '1.2rem' }}>ShopMaster</span>
             <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '400' }}>Premium Store</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" className="border-0 shadow-none" />
        
        <Navbar.Collapse id="navbar-content">
          {/* 2. Search Bar (Pill Shape) */}
          <Form className="d-flex mx-auto my-3 my-lg-0 w-100" style={{ maxWidth: '500px' }} onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-light" type="submit" className="search-btn text-muted">
                <Search size={18} />
              </Button>
            </InputGroup>
          </Form>

          {/* 3. Navigation Links & Icons */}
          <Nav className="ms-auto align-items-lg-center gap-2">
            
            <Nav.Link as={Link} to="/" className="fw-semibold text-dark px-3">Home</Nav.Link>
            
            <NavDropdown title="Shop" id="shop-dropdown" className="fw-semibold px-2">
              <NavDropdown.Item href="#electronics">Electronics</NavDropdown.Item>
              <NavDropdown.Item href="#clothing">Fashion</NavDropdown.Item>
              <NavDropdown.Item href="#home">Home & Living</NavDropdown.Item>
            </NavDropdown>

            {/* Divider on mobile */}
            <div className="d-lg-none my-2 border-top"></div>

            {/* Icon Buttons Group */}
            <div className="d-flex align-items-center gap-3 ms-lg-3">
                
                {/* Wishlist */}
                <Button variant="link" className="text-dark p-0 position-relative">
                   <Heart size={22} />
                </Button>

                {/* Cart */}
                <Button 
                    variant="link" 
                    className="text-dark p-0 position-relative"
                    onClick={toggleCart}
                >
                  <Cart3 size={24} />
                  {getCartCount() > 0 && (
                    <Badge 
                        bg="danger" 
                        pill
                        className="position-absolute top-0 start-100 translate-middle border border-light rounded-circle"
                        style={{ padding: '0.35em 0.5em', fontSize: '0.65rem' }}
                    >
                        {getCartCount()}
                    </Badge>
                  )}
                </Button>

                {/* User */}
                <NavDropdown 
                    title={<PersonCircle size={24} className="text-primary" />} 
                    id="user-dropdown" 
                    align="end"
                >
                    <NavDropdown.Item as={Link} to="/admin">Admin Panel</NavDropdown.Item>
                    <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#orders">Orders</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/login" className="text-primary">Login</NavDropdown.Item>
                    <NavDropdown.Item href="#logout" className="text-danger">Logout</NavDropdown.Item>
                </NavDropdown>
            </div>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <CartDrawer />
    </>
  );
}

export default NavbarItem;
