import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Table, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PencilSquare, Trash, PlusLg } from 'react-bootstrap-icons';
import CreateProductForm from './CreateProductForm';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/product');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleCreateClick = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`http://localhost:4000/api/product/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchProducts(); // Refresh list
            } else {
                const errorData = await response.json();
                alert(`Failed to delete product: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert(`Error deleting product: ${error.message}`);
        }
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="mb-0 fw-bold">Admin Dashboard</h2>
            <p className="text-muted">Manage your store inventory</p>
        </div>
        <div className="d-flex gap-2">
            <Button variant="success" onClick={handleCreateClick} className="d-flex align-items-center gap-2">
                <PlusLg /> Add Product
            </Button>
            <Button variant="outline-danger" onClick={handleLogout}>
                Logout
            </Button>
        </div>
      </div>

      <Card className="shadow border-0">
        <Card.Body className="p-0">
          {loading ? (
             <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
             </div>
          ) : (
            <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-light">
                <tr>
                    <th className="ps-4">Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                    <tr key={product._id}>
                        <td className="ps-4">
                            <div className="d-flex align-items-center">
                                {product.image && (
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="rounded me-3"
                                        style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                    />
                                )}
                                <div>
                                    <div className="fw-semibold">{product.name}</div>
                                    <small className="text-muted d-block text-truncate" style={{ maxWidth: '200px' }}>
                                        {product.description}
                                    </small>
                                </div>
                            </div>
                        </td>
                        <td>{product.category}</td>
                        <td className="fw-semibold">${Number(product.price).toFixed(2)}</td>
                        <td>
                            {product.available ? (
                                <Badge bg="success-subtle" text="success-emphasis">In Stock</Badge>
                            ) : (
                                <Badge bg="danger-subtle" text="danger-emphasis">Out of Stock</Badge>
                            )}
                        </td>
                        <td className="text-end pe-4">
                            <Button 
                                variant="light" 
                                size="sm" 
                                className="me-2 text-primary"
                                onClick={() => handleEditClick(product)}
                                title="Edit"
                            >
                                <PencilSquare size={18} />
                            </Button>
                            <Button 
                                variant="light" 
                                size="sm" 
                                className="text-danger"
                                onClick={() => handleDeleteClick(product._id)}
                                title="Delete"
                            >
                                <Trash size={18} />
                            </Button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">
                            No products found. Click "Add Product" to create one.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Reused Form for Create and Edit */}
      <CreateProductForm 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        onProductCreated={fetchProducts}
        productToEdit={editingProduct}
      />
    </Container>
  );
};

export default AdminPanel;