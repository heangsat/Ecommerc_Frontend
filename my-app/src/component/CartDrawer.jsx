import React from 'react';
import { Offcanvas, ListGroup, Button, Image } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Trash, Plus, Dash } from 'react-bootstrap-icons';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    toggleCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();

  return (
    <Offcanvas show={isCartOpen} onHide={toggleCart} placement="end" name="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">Your Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        {cartItems.length === 0 ? (
          <div className="text-center my-auto">
            <h5 className="text-muted">Your cart is empty</h5>
            <Button variant="primary" className="mt-3" onClick={toggleCart}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="d-flex gap-3 align-items-center py-3">
                  <div style={{ width: '70px', height: '70px', flexShrink: 0 }}>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fluid 
                      rounded 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="mb-0 fw-semibold text-truncate" style={{ maxWidth: '140px' }}>
                        {item.name}
                      </h6>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-danger p-0 ms-2"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                    <small className="text-muted d-block mb-2">
                        ${Number(item.price).toFixed(2)}
                    </small>
                    
                    <div className="d-flex align-items-center bg-light rounded d-inline-flex">
                        <Button 
                            variant="link" 
                            size="sm" 
                            className="text-dark p-1 px-2 text-decoration-none"
                            onClick={() => updateQuantity(item._id, -1)}
                            disabled={item.quantity <= 1}
                        >
                            <Dash size={12} />
                        </Button>
                        <span className="fw-semibold px-2" style={{ fontSize: '0.9rem' }}>
                            {item.quantity}
                        </span>
                        <Button 
                            variant="link" 
                            size="sm" 
                            className="text-dark p-1 px-2 text-decoration-none"
                            onClick={() => updateQuantity(item._id, 1)}
                        >
                            <Plus size={12} />
                        </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between mb-3">
                <span className="h5 mb-0">Total:</span>
                <span className="h5 mb-0 fw-bold text-primary">
                    ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <Button variant="dark" size="lg" className="w-100">
                Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;
