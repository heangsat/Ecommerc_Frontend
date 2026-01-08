import React from 'react';
import { Card, Form, Button, Accordion } from 'react-bootstrap';

const ProductFilters = ({ 
  filters, 
  setFilters, 
  categories, 
  clearFilters 
}) => {
  
  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    setFilters({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters({ 
      ...filters, 
      priceRange: { ...filters.priceRange, [name]: value } 
    });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="filters-sidebar">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">Filters</h5>
        <Button variant="link" size="sm" className="text-decoration-none" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <Accordion defaultActiveKey={['0', '1']} alwaysOpen flush>
        
        {/* Sort By */}
        <Accordion.Item eventKey="0" className="border-0 mb-3">
           <Accordion.Header>Sort By</Accordion.Header>
           <Accordion.Body className="px-0 pt-2">
              <Form.Select 
                size="sm" 
                value={filters.sortBy} 
                onChange={handleSortChange}
                className="shadow-sm"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </Form.Select>
           </Accordion.Body>
        </Accordion.Item>

        {/* Categories */}
        <Accordion.Item eventKey="1" className="border-0 mb-3">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body className="px-0 pt-2">
            {categories.map((cat) => (
              <Form.Check 
                key={cat}
                type="checkbox"
                id={`cat-${cat}`}
                label={cat}
                checked={filters.categories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="mb-2"
              />
            ))}
            {categories.length === 0 && <span className="text-muted small">No categories found</span>}
          </Accordion.Body>
        </Accordion.Item>

        {/* Price Range */}
        <Accordion.Item eventKey="2" className="border-0">
          <Accordion.Header>Price Range</Accordion.Header>
          <Accordion.Body className="px-0 pt-2">
            <div className="d-flex align-items-center gap-2">
              <Form.Control 
                type="number" 
                placeholder="Min" 
                name="min"
                value={filters.priceRange.min}
                onChange={handlePriceChange}
                size="sm"
                min="0"
              />
              <span>-</span>
              <Form.Control 
                type="number" 
                placeholder="Max" 
                name="max"
                value={filters.priceRange.max}
                onChange={handlePriceChange}
                size="sm"
                min="0"
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
};

export default ProductFilters;
