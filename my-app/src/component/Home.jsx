import { useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { Funnel } from 'react-bootstrap-icons';
import HeroItem from './HeroItem';
import ProductCard from './ProductCard';
import CreateProductForm from './CreateProductForm';
import ProductFilters from './ProductFilters';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter States
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/product');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Derive unique categories from products
  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return [...new Set(cats)];
  }, [products]);

  // Main Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    // 1. Search Query
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery) || 
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
    }

    // 2. Categories
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // 3. Price Range
    if (filters.priceRange.min !== '') {
        result = result.filter(p => p.price >= Number(filters.priceRange.min));
    }
    if (filters.priceRange.max !== '') {
        result = result.filter(p => p.price <= Number(filters.priceRange.max));
    }

    // 4. Sorting
    switch (filters.sortBy) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
        default:
             // Assuming _id or createdAt can be used, or reverse the original order if it comes sorted by date
             // For now, let's just reverse if we assume API returns oldest first, or sort by _id
             // Simple hack: if there's a createdAt field use it, else generic reverse
             result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            break;
    }

    return result;
  }, [products, searchParams, filters]);

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest'
    });
  };

  return (
    <main className="flex-grow-1 bg-light">
        
        {/* Hero Section - Only show on main page if no search active? Or always? Let's keep it always for now but maybe smaller */}
        {!searchParams.get('search') && (
            <div className="bg-white mb-4 shadow-sm">
                <HeroItem />
            </div>
        )}

        <Container fluid className="py-4">
          <Row>
            {/* Sidebar Filters - Desktop */}
            <Col lg={3} className="d-none d-lg-block mb-4">
                <div className="bg-white p-3 rounded shadow-sm sticky-top" style={{ top: '90px' }}>
                    <ProductFilters 
                        filters={filters} 
                        setFilters={setFilters} 
                        categories={categories}
                        clearFilters={clearFilters}
                    />
                </div>
            </Col>

            {/* Main Content */}
            <Col lg={9}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className="mb-0 fw-bold h3">
                            {searchParams.get('search') ? `Results for "${searchParams.get('search')}"` : 'All Products'}
                        </h2>
                        <span className="text-muted">{filteredProducts.length} items found</span>
                    </div>
                    
                    <div className="d-flex gap-2">
                         {/* Mobile Filter Toggle */}
                        <Button 
                            variant="outline-secondary" 
                            className="d-lg-none d-flex align-items-center gap-2"
                            onClick={() => setShowMobileFilters(true)}
                        >
                            <Funnel /> Filters
                        </Button>

                      
                    </div>
                </div>

                <Row>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                        <Col key={product._id} xl={4} md={6} sm={6} xs={12} className="mb-4">
                            <ProductCard product={product} />
                        </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <div className="py-5">
                                <h4 className="text-muted">No products match your criteria.</h4>
                                <Button variant="link" onClick={clearFilters}>Clear Filters</Button>
                            </div>
                        </Col>
                    )}
                </Row>
            </Col>
          </Row>

          {/* Mobile Filter Drawer */}
          <Offcanvas show={showMobileFilters} onHide={() => setShowMobileFilters(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ProductFilters 
                    filters={filters} 
                    setFilters={setFilters} 
                    categories={categories}
                    clearFilters={clearFilters}
                />
            </Offcanvas.Body>
          </Offcanvas>

          {/* Modal Form for Creating Products */}
          <CreateProductForm 
            show={showModal} 
            handleClose={() => setShowModal(false)} 
            onProductCreated={fetchProducts}
          />
        </Container>
      </main>
  )
}

export default Home;