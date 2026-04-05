import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateProductForm({ show, handleClose, onProductCreated, productToEdit }) {
  // Use separate state for the file
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    available: true
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        price: productToEdit.price || '',
        description: productToEdit.description || '',
        category: productToEdit.category || '',
        available: productToEdit.available !== undefined ? productToEdit.available : true
      });
    } else {
        // Reset form when not editing
        setFormData({
            name: '',
            price: '',
            description: '',
            category: '',
            available: true
          });
          setFile(null);
    }
  }, [productToEdit, show]); // Reset/Populate when modal opens or product changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to send file + text
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('available', formData.available);
    
    if (file) {
      data.append('image', file); 
    }

    try {
      const url = productToEdit 
        ? `https://backend-iody.onrender.com/api/product/${productToEdit._id}` 
        : 'https://backend-iody.onrender.com/api/product';
      
      const method = productToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: data,
      });

      if (response.ok) {
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          available: true
        });
        setFile(null);
        handleClose();
        onProductCreated();
        alert(`Product ${productToEdit ? 'updated' : 'created'} successfully!`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save product'}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert('Error saving product. Check console for details.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{productToEdit ? 'Edit Product' : 'Add New Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g., Gaming Mouse"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              min="0"
              placeholder="e.g., 49.99"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select a category...</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Audio">Audio</option>
              <option value="Sportswear">Sportswear</option>
              <option value="Accessories">Accessories</option>
            </Form.Select>
          </Form.Group>

          {/* Changed from URL input to File Input */}
          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              required={!productToEdit} // Only required if creating new
            />
            <Form.Text className="text-muted">
              {productToEdit ? 'Leave empty to keep current image.' : 'Upload an image (jpg, png).'}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              placeholder="Enter product details..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAvailable">
            <Form.Check 
              type="checkbox" 
              label="Available in stock" 
              name="available" 
              checked={formData.available} 
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {productToEdit ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateProductForm;
