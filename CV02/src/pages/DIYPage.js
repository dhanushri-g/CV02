import React, { useState } from 'react';
import { Search, Recycle } from 'lucide-react';

const DIYPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const wasteCategories = [
    {
      id: 1,
      name: 'Flowers',
      icon: '🌸',
      color: '#EC4899',
      description: 'Organic floral waste that can be composted or used for natural decorations.',
      disposalTips: [
        'Compost fresh flowers for nutrient-rich soil',
        'Remove any non-organic decorations before composting',
        'Use dried flowers for potpourri or crafts',
        'Avoid composting flowers treated with chemicals'
      ],
      recyclingInfo: 'Flowers decompose naturally and create excellent compost material rich in nitrogen.',
      examples: ['Rose petals', 'Marigolds', 'Jasmine', 'Wedding bouquets', 'Garden trimmings']
    },
    {
      id: 2,
      name: 'Cans',
      icon: '🥫',
      color: '#6B7280',
      description: 'Metal containers that are highly recyclable and valuable for the circular economy.',
      disposalTips: [
        'Rinse cans thoroughly to remove food residue',
        'Remove labels if required by local facility',
        'Crush cans to save space in recycling bins',
        'Separate aluminum from steel if needed'
      ],
      recyclingInfo: 'Aluminum cans can be recycled infinitely without losing quality. Steel cans are also highly recyclable.',
      examples: ['Soda cans', 'Food cans', 'Beer cans', 'Soup cans', 'Pet food cans']
    },
    {
      id: 3,
      name: 'Wood',
      icon: '🪵',
      color: '#92400E',
      description: 'Natural material that can be reused, recycled, or composted depending on treatment.',
      disposalTips: [
        'Separate treated wood from untreated wood',
        'Reuse for DIY projects and furniture',
        'Untreated wood can be composted or burned safely',
        'Take treated wood to specialized recycling centers'
      ],
      recyclingInfo: 'Wood can be recycled into particleboard, mulch, or biomass fuel. Untreated wood is biodegradable.',
      examples: ['Furniture', 'Construction lumber', 'Pallets', 'Tree branches', 'Wooden crates']
    },
    {
      id: 4,
      name: 'Clothes',
      icon: '👕',
      color: '#7C3AED',
      description: 'Textile waste that can be donated, recycled, or upcycled into new products.',
      disposalTips: [
        'Donate clothes in good condition to charities',
        'Use textile recycling bins for worn-out items',
        'Repurpose old clothes into cleaning rags',
        'Consider clothing swaps with friends and family'
      ],
      recyclingInfo: 'Textiles can be recycled into new fabrics, insulation, or industrial materials.',
      examples: ['Old t-shirts', 'Jeans', 'Shoes', 'Bed linens', 'Towels']
    },
    {
      id: 5,
      name: 'Kitchen Waste',
      icon: '🍎',
      color: '#10B981',
      description: 'Organic food waste that is perfect for composting and creating nutrient-rich soil.',
      disposalTips: [
        'Separate organic waste from packaging',
        'Compost fruit and vegetable scraps',
        'Avoid composting meat, dairy, and oily foods',
        'Use a kitchen compost bin for easy collection'
      ],
      recyclingInfo: 'Kitchen waste creates excellent compost that reduces methane emissions from landfills.',
      examples: ['Fruit peels', 'Vegetable scraps', 'Coffee grounds', 'Eggshells', 'Tea bags']
    },
    {
      id: 6,
      name: 'Cardboard',
      icon: '📦',
      color: '#F59E0B',
      description: 'Paper-based packaging material that is highly recyclable and biodegradable.',
      disposalTips: [
        'Remove all tape, staples, and plastic components',
        'Flatten boxes to save space in recycling bins',
        'Keep cardboard dry and clean',
        'Separate wax-coated cardboard for special recycling'
      ],
      recyclingInfo: 'Cardboard can be recycled 5-7 times before fibers become too short to use.',
      examples: ['Shipping boxes', 'Cereal boxes', 'Pizza boxes (clean)', 'Egg cartons', 'Toilet paper tubes']
    },
    {
      id: 7,
      name: 'Sugarcane Pulp',
      icon: '🌾',
      color: '#84CC16',
      description: 'Biodegradable material from sugarcane processing, excellent for composting.',
      disposalTips: [
        'Compost sugarcane pulp products naturally',
        'Break into smaller pieces for faster decomposition',
        'Mix with other organic materials in compost',
        'Avoid products with plastic coatings'
      ],
      recyclingInfo: 'Sugarcane pulp decomposes within 60-90 days and enriches soil with organic matter.',
      examples: ['Food containers', 'Plates and bowls', 'Takeaway boxes', 'Cup holders', 'Packaging materials']
    },
    {
      id: 8,
      name: 'Plastic',
      icon: '♻️',
      color: '#3B82F6',
      description: 'Synthetic materials with various recycling codes requiring proper sorting.',
      disposalTips: [
        'Check recycling numbers (1-7) on containers',
        'Clean containers before recycling',
        'Remove caps and lids if required locally',
        'Avoid putting plastic bags in regular recycling'
      ],
      recyclingInfo: 'Different plastic types have different recycling processes. PET and HDPE are most commonly recycled.',
      examples: ['Water bottles', 'Food containers', 'Shopping bags', 'Yogurt cups', 'Detergent bottles']
    },
    {
      id: 9,
      name: 'Pads',
      icon: '🩹',
      color: '#EF4444',
      description: 'Sanitary products that require special disposal methods for hygiene and environmental reasons.',
      disposalTips: [
        'Wrap used pads in newspaper or disposal bags',
        'Dispose in general waste, not recycling',
        'Consider biodegradable or reusable alternatives',
        'Never flush pads down toilets'
      ],
      recyclingInfo: 'Most pads contain plastic and are not recyclable. Biodegradable options are becoming available.',
      examples: ['Sanitary pads', 'Panty liners', 'Incontinence pads', 'Baby changing pads', 'Pet training pads']
    },
    {
      id: 10,
      name: 'Glass',
      icon: '🍶',
      color: '#06B6D4',
      description: 'Infinitely recyclable material that maintains quality through multiple recycling cycles.',
      disposalTips: [
        'Rinse containers to remove food residue',
        'Remove caps and lids before recycling',
        'Separate by color if required locally',
        'Handle carefully to avoid breakage during transport'
      ],
      recyclingInfo: 'Glass can be recycled endlessly without loss of quality or purity.',
      examples: ['Wine bottles', 'Jam jars', 'Beer bottles', 'Perfume bottles', 'Food containers']
    },
    {
      id: 11,
      name: 'Metals',
      icon: '🔩',
      color: '#64748B',
      description: 'Valuable materials including ferrous and non-ferrous metals with high recycling value.',
      disposalTips: [
        'Separate ferrous (magnetic) from non-ferrous metals',
        'Clean metals of any attachments or coatings',
        'Take large metal items to scrap yards',
        'Small metal items can go in regular recycling'
      ],
      recyclingInfo: 'Metals retain their properties indefinitely and can be recycled repeatedly without degradation.',
      examples: ['Aluminum foil', 'Copper wire', 'Steel appliances', 'Brass fittings', 'Iron scraps']
    }
  ];

  const filteredCategories = wasteCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="diy-page">
      <div className="container">
        {/* Header */}
        <div className="diy-header">
          <h1 className="diy-title">
            <Recycle className="title-icon" />
            Waste Information Guide
          </h1>
          <p className="diy-description">
            Learn about different types of waste and how to dispose of them properly for a sustainable future.
          </p>
        </div>

        {/* Search */}
        <div className="diy-controls">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search waste categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Waste Categories Grid */}
        <div className="waste-categories-grid">
          {filteredCategories.map(category => (
            <div key={category.id} className="waste-category-card">
              <div className="category-header">
                <div
                  className="category-icon-wrapper"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  <span className="category-emoji">{category.icon}</span>
                </div>
                <h3 className="category-name">{category.name}</h3>
              </div>

              <p className="category-description">{category.description}</p>

              <div className="disposal-tips">
                <h4>Disposal Tips:</h4>
                <ul className="tips-list">
                  {category.disposalTips.map((tip, index) => (
                    <li key={index} className="tip-item">{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="recycling-info">
                <h4>Recycling Information:</h4>
                <p className="recycling-text">{category.recyclingInfo}</p>
              </div>

              <div className="examples-section">
                <h4>Examples:</h4>
                <div className="examples-list">
                  {category.examples.map((example, index) => (
                    <span key={index} className="example-tag">{example}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="no-results">
            <Recycle className="no-results-icon" />
            <h3>No categories found</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        )}

        {/* Environmental Impact Section */}
        <div className="environmental-impact">
          <h2 className="impact-title">Environmental Impact</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">🌍</div>
              <h3>Reduce Landfill Waste</h3>
              <p>Proper waste sorting reduces the amount of waste going to landfills by up to 70%.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">♻️</div>
              <h3>Save Energy</h3>
              <p>Recycling materials uses 30-70% less energy than producing new materials from raw resources.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🌱</div>
              <h3>Reduce Emissions</h3>
              <p>Proper composting of organic waste reduces methane emissions by up to 25%.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">💧</div>
              <h3>Conserve Water</h3>
              <p>Recycling saves significant amounts of water used in manufacturing processes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DIYPage;
