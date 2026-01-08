import React from 'react';
import Card from 'react-bootstrap/Card'; 
import Col from 'react-bootstrap/Col';   

// The Categery component now accepts data (props)
function Categery({ categoryName, itemCount, imageUrl }) {
    return (
        // Wrap in Col to ensure it works within the parent Row
        // Use xs={4} sm={3} md={2} to show 6 items per row on large screens
        <Col xs={4} sm={3} md={2} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm" style={{ backgroundColor: '#f9f9f9' }}>
                
                {/* Image Section */}
                <div className="d-flex justify-content-center align-items-center p-3" style={{ height: '100px' }}>
                    <Card.Img 
                        variant="top" 
                        src={imageUrl} 
                        alt={categoryName} 
                        style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                </div>

                {/* Text Content */}
                <Card.Body className="p-2">
                    <Card.Title className="mb-0 fs-6 fw-bold">{categoryName}</Card.Title>
                    <Card.Text className="text-muted small">
                        {itemCount} items
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Categery;