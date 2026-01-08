import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Heart, HeartFill, CartPlus, CheckLg } from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, toggleCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    // toggleCart(); // Optional: open cart immediately
    setTimeout(() => setIsAdded(false), 2000); // Reset button state after 2s
  };

  return (
    <Card className="product-card h-100">
      <div className="product-img-wrapper">
        <Badge bg="warning" text="dark" className="badge-overlay">
          {product.category || 'New'}
        </Badge>
        
        <button 
            className="wishlist-btn" 
            onClick={() => setIsWishlisted(!isWishlisted)}
            title="Add to Wishlist"
        >
            {isWishlisted ? <HeartFill /> : <Heart />}
        </button>

        <Card.Img 
            variant="top" 
            src={product.image} 
            className="product-img"
        />
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <div className="mb-2">
            <Card.Title className="card-title-custom" title={product.name}>
                {product.name}
            </Card.Title>
            <div className="card-desc-custom">
                {product.description}
            </div>
        </div>
        
        <div className="mt-auto d-flex align-items-center justify-content-between">
            <span className="price-tag text-primary">
                ${Number(product.price).toFixed(2)}
            </span>
            <Button 
                className={`add-btn d-flex align-items-center gap-2 ${isAdded ? 'btn-success' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.available}
            >
                {isAdded ? <CheckLg size={18} /> : <CartPlus size={18} />}
                <span>{isAdded ? 'Added' : 'Add'}</span>
            </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;