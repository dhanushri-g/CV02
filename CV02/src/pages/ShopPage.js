import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, Heart, Leaf, Award, Truck, Info, Plus, Minus, Sparkles, Shield, Zap } from 'lucide-react';

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

  const products = [
    {
      id: 1,
      name: 'Paper Plates',
      category: 'paper',
      price: 12.99,
      originalPrice: 18.99,
      rating: 4.8,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Biodegradable paper plates made from 100% recycled materials',
      features: ['100% recycled paper', 'Compostable', 'Microwave safe', 'Pack of 50'],
      eco: true,
      bestseller: true,
      detailedInfo: 'Made from post-consumer recycled paper, these plates decompose within 90 days in commercial composting facilities. Perfect for parties, picnics, and everyday use while reducing environmental impact.'
    },
    {
      id: 2,
      name: 'Paper Cups',
      category: 'paper',
      price: 8.99,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Compostable paper cups with plant-based lining',
      features: ['Plant-based lining', 'Hot & cold drinks', 'Leak-proof', 'Pack of 100'],
      eco: true,
      new: true,
      detailedInfo: 'These cups feature a revolutionary plant-based lining instead of plastic, making them fully compostable. Suitable for both hot and cold beverages, they maintain structural integrity while being environmentally responsible.'
    },
    {
      id: 3,
      name: 'Agarbatti (Incense Sticks)',
      category: 'agarbatti',
      price: 15.99,
      rating: 4.9,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Handmade incense sticks from recycled bamboo and natural herbs',
      features: ['Recycled bamboo sticks', 'Natural herbs', 'Chemical-free', 'Pack of 200'],
      eco: true,
      detailedInfo: 'Crafted from recycled bamboo waste and natural aromatic herbs, these incense sticks provide a pure, chemical-free fragrance experience. The bamboo sticks are sourced from construction waste, giving them a second life.'
    },
    {
      id: 4,
      name: 'Recycled Bricks',
      category: 'bricks',
      price: 45.99,
      rating: 4.7,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Eco-friendly bricks made from recycled construction waste',
      features: ['Recycled materials', 'High durability', 'Thermal insulation', 'Pack of 25'],
      eco: true,
      bestseller: true,
      detailedInfo: 'These innovative bricks are manufactured from 70% recycled construction waste including concrete, ceramics, and clay. They offer superior thermal insulation and are 30% lighter than traditional bricks while maintaining structural strength.'
    },
    {
      id: 5,
      name: 'Paper Pens with Seeds',
      category: 'paper',
      price: 24.99,
      rating: 4.5,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Biodegradable pens with embedded seeds that grow into plants',
      features: ['Embedded seeds', 'Biodegradable body', 'Smooth writing', 'Pack of 10'],
      eco: true,
      new: true,
      detailedInfo: 'Revolutionary writing instruments made from recycled paper and embedded with herb seeds. After use, plant the pen in soil and watch it grow into basil, mint, or cilantro. The ink is soy-based and non-toxic.'
    },
    {
      id: 6,
      name: 'Sugarcane Fiber Sandals',
      category: 'sandals',
      price: 39.99,
      rating: 4.4,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Comfortable sandals made from recycled sugarcane bagasse',
      features: ['Sugarcane fiber', 'Lightweight', 'Water-resistant', 'Multiple sizes'],
      eco: true,
      detailedInfo: 'Innovative footwear crafted from sugarcane bagasse (waste pulp) that would otherwise be burned or discarded. The material is naturally antimicrobial, lightweight, and provides excellent comfort for daily wear.'
    },
    {
      id: 7,
      name: 'Banana Fiber Sandals',
      category: 'sandals',
      price: 42.99,
      rating: 4.6,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Handwoven sandals from banana plant waste fiber',
      features: ['Banana fiber', 'Handwoven', 'Breathable', 'Eco-friendly dyes'],
      eco: true,
      bestseller: true,
      detailedInfo: 'Artisan-crafted sandals made from banana plant pseudostem fiber, typically discarded after fruit harvest. The natural fiber is incredibly strong, breathable, and biodegradable. Each pair supports rural communities and sustainable agriculture.'
    },
    {
      id: 8,
      name: 'Paper Sheets',
      category: 'paper',
      price: 16.99,
      rating: 4.8,
      reviews: 389,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Premium writing paper made from 100% post-consumer waste',
      features: ['100% recycled', 'Acid-free', 'Smooth texture', '500 sheets'],
      eco: true,
      detailedInfo: 'High-quality writing paper manufactured entirely from post-consumer recycled materials. The chlorine-free bleaching process and acid-free composition ensure longevity while minimizing environmental impact. Perfect for offices and schools.'
    },
    {
      id: 9,
      name: 'Softwood Planks',
      category: 'wood',
      price: 89.99,
      rating: 4.5,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Reclaimed softwood planks perfect for DIY projects',
      features: ['Reclaimed wood', 'Sanded finish', 'Various lengths', 'Pack of 10'],
      eco: true,
      detailedInfo: 'Reclaimed softwood planks sourced from demolished buildings and construction waste. Each plank is carefully inspected, cleaned, and sanded to provide a smooth finish while preserving the natural character and grain of the wood.'
    },
    {
      id: 10,
      name: 'Hardwood Boards',
      category: 'wood',
      price: 129.99,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Premium reclaimed hardwood boards for furniture making',
      features: ['Premium hardwood', 'Kiln-dried', 'Pest-free', 'Pack of 8'],
      eco: true,
      bestseller: true,
      detailedInfo: 'Exceptional quality reclaimed hardwood boards from vintage furniture and architectural elements. Kiln-dried and treated to eliminate pests while preserving the rich patina and character. Ideal for high-end furniture and decorative projects.'
    },
    {
      id: 11,
      name: 'Bamboo Paper Towels',
      category: 'paper',
      price: 14.99,
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7110c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Ultra-absorbent paper towels made from sustainable bamboo',
      features: ['Bamboo fiber', '3-ply strength', 'Compostable', 'Pack of 6 rolls'],
      eco: true,
      new: true,
      detailedInfo: 'Made from fast-growing bamboo that requires no pesticides or fertilizers. These towels are 3x more absorbent than traditional paper towels and decompose within 30 days. Each roll saves 17 trees compared to regular paper towels.'
    },
    {
      id: 12,
      name: 'Coconut Fiber Mats',
      category: 'home',
      price: 29.99,
      rating: 4.4,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Natural doormats woven from coconut husk fiber',
      features: ['Coconut fiber', 'Durable', 'Weather-resistant', 'Multiple sizes'],
      eco: true,
      detailedInfo: 'Handcrafted doormats using coconut husk fiber, a byproduct of coconut processing. These mats are naturally durable, weather-resistant, and biodegradable. They effectively trap dirt and moisture while adding rustic charm to your entrance.'
    },
    {
      id: 13,
      name: 'Jute Shopping Bags',
      category: 'bags',
      price: 19.99,
      rating: 4.7,
      reviews: 298,
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Reusable shopping bags made from natural jute fiber',
      features: ['Natural jute', 'Reinforced handles', 'Washable', 'Folds compactly'],
      eco: true,
      bestseller: true,
      detailedInfo: 'Sustainable shopping bags crafted from natural jute fiber, one of the most eco-friendly materials available. These bags can carry up to 20kg, fold into a small pouch, and are machine washable. Each bag replaces hundreds of plastic bags.'
    },
    {
      id: 14,
      name: 'Bamboo Cutlery Set',
      category: 'kitchen',
      price: 34.99,
      rating: 4.8,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Complete bamboo cutlery set for sustainable dining',
      features: ['Bamboo handles', 'Stainless steel', 'Travel case', 'Set of 4'],
      eco: true,
      new: true,
      detailedInfo: 'Elegant cutlery set featuring bamboo handles and high-quality stainless steel. The bamboo is sustainably harvested and naturally antimicrobial. Includes fork, knife, spoon, and chopsticks in a compact travel case. Perfect for picnics and travel.'
    },
    {
      id: 15,
      name: 'Recycled Glass Vases',
      category: 'home',
      price: 27.99,
      rating: 4.5,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Beautiful vases crafted from 100% recycled glass',
      features: ['Recycled glass', 'Hand-blown', 'Unique patterns', 'Various sizes'],
      eco: true,
      detailedInfo: 'Artisan-crafted vases made entirely from post-consumer recycled glass. Each piece is hand-blown, creating unique patterns and variations. The glass is melted down from bottles and containers, reducing landfill waste while creating beautiful home decor.'
    },
    {
      id: 16,
      name: 'Organic Cotton Tote',
      category: 'bags',
      price: 24.99,
      rating: 4.6,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Stylish tote bag made from certified organic cotton',
      features: ['Organic cotton', 'Natural dyes', 'Reinforced bottom', 'Multiple colors'],
      eco: true,
      detailedInfo: 'Versatile tote bags made from GOTS-certified organic cotton, grown without pesticides or synthetic fertilizers. The natural dyes are free from harmful chemicals, and the reinforced bottom ensures durability for daily use.'
    },
    {
      id: 17,
      name: 'Bamboo Toothbrushes',
      category: 'personal',
      price: 12.99,
      rating: 4.7,
      reviews: 389,
      image: 'https://images.unsplash.com/photo-1559591935-c7d0a1c2c5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Biodegradable toothbrushes with bamboo handles',
      features: ['Bamboo handle', 'BPA-free bristles', 'Compostable', 'Pack of 4'],
      eco: true,
      bestseller: true,
      detailedInfo: 'Eco-friendly toothbrushes with handles made from sustainable bamboo and BPA-free bristles. The bamboo is naturally antimicrobial and decomposes within 6 months in compost. Each brush comes in minimal packaging to reduce waste.'
    },
    {
      id: 18,
      name: 'Hemp Rope',
      category: 'crafts',
      price: 18.99,
      rating: 4.4,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Natural hemp rope for crafts and gardening',
      features: ['Natural hemp', 'Various thicknesses', 'UV resistant', '50m spool'],
      eco: true,
      detailedInfo: 'Premium hemp rope made from natural hemp fibers, one of the most sustainable crops on Earth. Hemp requires minimal water, no pesticides, and enriches the soil. Perfect for crafts, gardening, and decorative purposes.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'paper', name: 'Paper Products', count: products.filter(p => p.category === 'paper').length },
    { id: 'agarbatti', name: 'Agarbatti', count: products.filter(p => p.category === 'agarbatti').length },
    { id: 'bricks', name: 'Bricks', count: products.filter(p => p.category === 'bricks').length },
    { id: 'sandals', name: 'Sandals', count: products.filter(p => p.category === 'sandals').length },
    { id: 'wood', name: 'Wood Products', count: products.filter(p => p.category === 'wood').length },
    { id: 'home', name: 'Home & Garden', count: products.filter(p => p.category === 'home').length },
    { id: 'bags', name: 'Bags & Totes', count: products.filter(p => p.category === 'bags').length },
    { id: 'kitchen', name: 'Kitchen', count: products.filter(p => p.category === 'kitchen').length },
    { id: 'personal', name: 'Personal Care', count: products.filter(p => p.category === 'personal').length },
    { id: 'crafts', name: 'Crafts', count: products.filter(p => p.category === 'crafts').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.new ? 1 : -1;
      default:
        return b.bestseller ? 1 : -1;
    }
  });

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Reset quantity for this product
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));

    // Show success message
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const buyNow = (product, quantity = 1) => {
    // Simulate immediate purchase
    alert(`Purchase successful! You bought ${quantity} ${product.name}(s) for $${(product.price * quantity).toFixed(2)}`);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const updateQuantity = (productId, change) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const newQuantity = Math.max(1, current + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const getQuantity = (productId) => {
    return quantities[productId] || 1;
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleProductDetails = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="shop-page">
      <div className="container">
        {/* Header */}
        <div className="shop-header">
          <div className="shop-title-section">
            <h1 className="shop-title">
              <Leaf className="title-icon" />
              Eco Shop
            </h1>
            <p className="shop-description">
              Discover sustainable products to support your zero-waste lifestyle
            </p>
            <div className="shop-stats">
              <div className="stat-item">
                <Sparkles size={16} />
                <span>500+ Eco Products</span>
              </div>
              <div className="stat-item">
                <Shield size={16} />
                <span>100% Sustainable</span>
              </div>
              <div className="stat-item">
                <Zap size={16} />
                <span>Carbon Neutral</span>
              </div>
            </div>
          </div>
          
          <div className="cart-summary">
            <button className="cart-btn">
              <ShoppingCart size={20} />
              Cart ({getCartItemCount()})
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="shop-controls">
          <div className="search-filter-row">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search eco-friendly products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="sort-dropdown">
              <Filter size={16} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {sortedProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badges">
                  {product.eco && <span className="badge eco">🌱 Eco</span>}
                  {product.bestseller && <span className="badge bestseller">🏆 Bestseller</span>}
                  {product.new && <span className="badge new">✨ New</span>}
                </div>
                <button className="wishlist-btn">
                  <Heart size={20} />
                </button>
              </div>

              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'filled' : ''}
                      />
                    ))}
                  </div>
                  <span className="rating-text">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="product-features">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Detailed Information */}
                {product.detailedInfo && (
                  <div className="product-details">
                    <button
                      className="details-toggle"
                      onClick={() => toggleProductDetails(product.id)}
                    >
                      <Info size={14} />
                      {expandedProduct === product.id ? 'Hide Details' : 'Show Details'}
                    </button>

                    {expandedProduct === product.id && (
                      <div className="detailed-info">
                        <p>{product.detailedInfo}</p>
                        <div className="all-features">
                          <h4>Features:</h4>
                          <ul>
                            {product.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <label>Quantity:</label>
                  <div className="quantity-selector">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="quantity-display">{getQuantity(product.id)}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="product-footer">
                  <div className="product-price">
                    <span className="current-price">
                      ${(product.price * getQuantity(product.id)).toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${(product.originalPrice * getQuantity(product.id)).toFixed(2)}
                      </span>
                    )}
                    {getQuantity(product.id) > 1 && (
                      <span className="unit-price">
                        (${product.price} each)
                      </span>
                    )}
                  </div>

                  <div className="product-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product, getQuantity(product.id))}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      className="buy-now-btn"
                      onClick={() => buyNow(product, getQuantity(product.id))}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="no-results">
            <Leaf className="no-results-icon" />
            <h3>No products found</h3>
            <p>Try adjusting your search terms or category filter.</p>
          </div>
        )}

        {/* Benefits Section */}
        <div className="shop-benefits">
          <h2 className="benefits-title">Why Shop With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <Leaf className="benefit-icon" />
              <h3>100% Eco-Friendly</h3>
              <p>All products are sustainably sourced and environmentally responsible.</p>
            </div>
            <div className="benefit-card">
              <Truck className="benefit-icon" />
              <h3>Carbon-Neutral Shipping</h3>
              <p>Free shipping on orders over $50 with carbon offset included.</p>
            </div>
            <div className="benefit-card">
              <Award className="benefit-icon" />
              <h3>Quality Guaranteed</h3>
              <p>30-day money-back guarantee on all eco-friendly products.</p>
            </div>
            <div className="benefit-card">
              <Heart className="benefit-icon" />
              <h3>Impact Tracking</h3>
              <p>See the environmental impact of your purchases in your profile.</p>
            </div>
            <div className="benefit-card">
              <Sparkles className="benefit-icon" />
              <h3>Artisan Crafted</h3>
              <p>Support local artisans and traditional craftsmanship worldwide.</p>
            </div>
            <div className="benefit-card">
              <Shield className="benefit-icon" />
              <h3>Transparent Sourcing</h3>
              <p>Know exactly where and how your products are made.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
