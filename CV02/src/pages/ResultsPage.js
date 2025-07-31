import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Camera, CheckCircle, Recycle, Lightbulb, Leaf, RotateCcw } from 'lucide-react';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the result data from navigation state
  const { result, image } = location.state || {};

  // If no result data, redirect to scan page
  if (!result) {
    return (
      <div className="results-page">
        <div className="container">
          <div className="no-results">
            <h2>No scan results found</h2>
            <p>Please scan an item first to see the results.</p>
            <Link to="/scanner" className="btn btn-primary">
              <Camera size={20} />
              Start Scanning
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { category, confidence } = result;

  return (
    <div className="results-page">
      <div className="container">
        {/* Header */}
        <div className="results-header">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="results-title">Scan Results</h1>
        </div>

        <div className="results-content">
          {/* Image and Classification */}
          <div className="results-main">
            <div className="scanned-image">
              <img src={image} alt="Scanned item" />
            </div>

            <div className="classification-result">
              <div className="confidence-badge">
                <CheckCircle size={16} />
                {confidence}% confident
              </div>

              <div className="category-info">
                <div
                  className="category-icon-large"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  <span className="category-emoji">{category.icon}</span>
                </div>
                <h2 className="category-name">{category.name}</h2>
                <p className="category-description">{category.description}</p>
              </div>
            </div>
          </div>

          {/* Disposal Tips */}
          <div className="info-section">
            <div className="section-header">
              <Lightbulb className="section-icon" />
              <h3>Disposal Tips</h3>
            </div>
            <ul className="tips-list">
              {category.disposalTips.map((tip, index) => (
                <li key={index} className="tip-item">
                  <CheckCircle size={16} className="tip-icon" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div className="info-section">
            <div className="section-header">
              <Recycle className="section-icon" />
              <h3>Common Examples</h3>
            </div>
            <div className="examples-grid">
              {category.examples.map((example, index) => (
                <div key={index} className="example-tag">
                  {example}
                </div>
              ))}
            </div>
          </div>

          {/* Recycling Information */}
          <div className="info-section recycling-info">
            <div className="section-header">
              <Leaf className="section-icon" />
              <h3>Environmental Impact</h3>
            </div>

            <div className="recycling-details">
              <div className="recycling-item">
                <h4>Recycling Process</h4>
                <p>{category.recyclingInfo.process}</p>
              </div>

              <div className="recycling-item">
                <h4>New Products Made</h4>
                <div className="products-list">
                  {category.recyclingInfo.newProducts.map((product, index) => (
                    <span key={index} className="product-tag">{product}</span>
                  ))}
                </div>
              </div>

              <div className="recycling-item">
                <h4>Environmental Benefit</h4>
                <p className="benefit-text">{category.recyclingInfo.energySaved}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="results-actions">
            <Link to="/scanner" className="btn btn-secondary">
              <RotateCcw size={20} />
              Scan Another Item
            </Link>
            <Link to="/info" className="btn btn-primary">
              <Leaf size={20} />
              View More Statistics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
