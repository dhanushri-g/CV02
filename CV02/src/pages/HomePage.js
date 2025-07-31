import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Recycle, Leaf, Smartphone, Trash2, Zap } from 'lucide-react';
import { wasteCategories } from '../data/wasteCategories';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Smart Waste Sorting Made <span className="highlight">Simple</span>
            </h1>
            <p className="hero-description">
              Use your camera to identify waste items and learn how to dispose of them properly.
              Join the movement towards a more sustainable future with Greenify's AI-powered waste sorting.
            </p>
            <div className="hero-buttons">
              <Link to="/scanner" className="btn btn-primary">
                <Camera size={20} />
                Start Scanning
              </Link>
              <Link to="/shop" className="btn btn-secondary">
                <Recycle size={20} />
                Shop Eco Products
              </Link>
            </div>
          </div>
          <div className="Background_image"></div>
          <div className="hero-image">
            <img src="https://via.placeholder.com/600x400" alt="Smart Waste Sorting" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">
                <Camera size={32} />
              </div>
              <h3 className="step-title">1. Scan or Upload</h3>
              <p className="step-description">
                Use your device's camera to scan an item or upload a photo from your gallery.
              </p>
            </div>
            <div className="step">
              <div className="step-icon">
                <Smartphone size={32} />
              </div>
              <h3 className="step-title">2. AI Analysis</h3>
              <p className="step-description">
                Our smart system analyzes the image and identifies the waste category.
              </p>x
            </div>
            <div className="step">
              <div className="step-icon">
                <Recycle size={32} />
              </div>
              <h3 className="step-title">3. Get Guidance</h3>
              <p className="step-description">
                Receive detailed disposal tips and recycling information for proper waste management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Categories */}
      <section className="waste-categories">
        <div className="container">
          <h2 className="section-title">Waste Categories We Identify</h2>
          <div className="categories-grid">
            {Object.values(wasteCategories).map((category) => (
              <div key={category.id} className="category-card">
                <div 
                  className="category-icon"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  <span className="category-emoji">{category.icon}</span>
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-examples">
                  {category.examples.slice(0, 3).map((example, index) => (
                    <span key={index} className="example-tag">{example}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <Leaf className="cta-icon" />
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Start sorting your waste properly today and contribute to a cleaner, greener planet.
            </p>
            <Link to="/scanner" className="btn btn-primary btn-large">
              <Camera size={24} />
              Start Scanning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
